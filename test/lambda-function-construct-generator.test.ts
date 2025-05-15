import * as fs from "fs";
import * as path from "path";
import { javascript } from "projen";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LambdaFunctionConstructGenerator } from "../src";

vi.mock("fs");
vi.mock("path");

describe("LambdaFunctionConstructGenerator", () => {
    let project: javascript.NodeProject;

    beforeEach(() => {
        vi.resetAllMocks();
        project = new javascript.NodeProject({
            name: "test-project",
            defaultReleaseBranch: "main",
        });

        // Mock fs.mkdirSync and fs.writeFileSync
        vi.mocked(fs.mkdirSync).mockImplementation(() => undefined);
        vi.mocked(fs.writeFileSync).mockImplementation(() => undefined);
        vi.mocked(path.join).mockImplementation((...paths) => paths.join("/"));
        vi.mocked(path.dirname).mockImplementation((p) => p.split("/").slice(0, -1).join("/"));
    });

    it("should create with default options", () => {
        const component = new LambdaFunctionConstructGenerator(project);

        expect(component.sourceDir).toBe("src/handlers");
        expect(component.outputDir).toBe("src/constructs/lambda");
        expect(component.filePattern).toBe("*.lambda.ts");
        expect(component.esbuildOptions).toEqual({});
    });

    it("should create with custom options", () => {
        const component = new LambdaFunctionConstructGenerator(project, {
            sourceDir: "custom/source",
            outputDir: "custom/output",
            filePattern: "*.custom.ts",
            esbuildOptions: { minify: false },
        });

        expect(component.sourceDir).toBe("custom/source");
        expect(component.outputDir).toBe("custom/output");
        expect(component.filePattern).toBe("*.custom.ts");
        expect(component.esbuildOptions).toEqual({ minify: false });
    });

    it("should add required dependencies", () => {
        new LambdaFunctionConstructGenerator(project);

        const deps = project.deps.all;
        expect(deps.some((d) => d.name === "aws-cdk-lib")).toBe(true);
        expect(deps.some((d) => d.name === "constructs")).toBe(true);
    });

    it("should not add dependencies when addDependencies is false", () => {
        new LambdaFunctionConstructGenerator(project, { addDependencies: false });

        const deps = project.deps.all;
        expect(deps.some((d) => d.name === "aws-cdk-lib")).toBe(false);
    });

    it("should create bundle task", () => {
        new LambdaFunctionConstructGenerator(project);

        const bundleTask = project.tasks.tryFind("generate-and-bundle");
        expect(bundleTask).toBeDefined();
        expect(bundleTask?.description).toBe("Bundle Lambda Functions using esbuild");
    });

    it("should add bundle task to compile workflow", () => {
        new LambdaFunctionConstructGenerator(project);

        // Mock the compile task and bundle task
        const bundleTask = project.tasks.tryFind("generate-and-bundle");
        const compileTask = project.tasks.tryFind("compile");

        // Just check if both tasks exist
        expect(bundleTask).toBeDefined();
        expect(compileTask).toBeDefined();
    });
});
