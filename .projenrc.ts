import { Vitest } from "@nikovirtala/projen-vitest";
import { cdk, javascript, JsonPatch, TextFile } from "projen";

const nodeVersion = "22.21.1";

const project = new cdk.JsiiProject({
    author: "Niko Virtala",
    authorAddress: "niko.virtala@hey.com",
    defaultReleaseBranch: "main",
    dependabot: false,
    description: "Projen component to generate AWS CDK Lambda Function Constructs and bundle their Code Assets",
    deps: ["aws-cdk-lib", "constructs", "projen", "@mrgrain/cdk-esbuild"],
    depsUpgradeOptions: {
        workflowOptions: {
            labels: ["auto-approve", "auto-merge"],
        },
    },
    devDeps: [
        "@mrgrain/cdk-esbuild",
        "@nikovirtala/projen-vitest",
        "@types/glob",
        "@types/yargs",
        "change-case",
        "esbuild",
        "glob",
        "tsx",
        "yargs",
    ],
    autoApproveOptions: {
        secret: "GITHUB_TOKEN",
        allowedUsernames: ["nikovirtala"],
    },
    jest: false,
    jsiiVersion: "~5.9.3",
    license: "MIT",
    licensed: true,
    mergify: true,
    name: "projen-lambda-function-construct-generator",
    npmAccess: javascript.NpmAccess.PUBLIC,
    packageManager: javascript.NodePackageManager.PNPM,
    packageName: "@nikovirtala/projen-lambda-function-construct-generator",
    peerDeps: ["aws-cdk-lib", "constructs", "projen", "@mrgrain/cdk-esbuild"],
    pnpmVersion: "10",
    prettier: true,
    prettierOptions: {
        settings: {
            printWidth: 120,
            tabWidth: 4,
            trailingComma: javascript.TrailingComma.ALL,
        },
    },
    projenrcTs: true,
    releaseToNpm: true,
    repositoryUrl: "https://github.com/nikovirtala/projen-lambda-function-construct-generator.git",
    typescriptVersion: "5.9.3",
});

new Vitest(project);

project.vscode?.extensions.addRecommendations("biomejs.biome");

project.vscode?.settings.addSettings({
    "editor.codeActionsOnSave": {
        "source.organizeImports.biome": "always",
    },
    "editor.defaultFormatter": "biomejs.biome",
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
});

new TextFile(project, "mise.toml", {
    committed: true,
    readonly: true,
    lines: ["[tools]", `node = "${nodeVersion}"`],
});

// use node.js 24.x to get new enough npm to satisfy: trusted publishing requires npm CLI version 11.5.1 or later.
project.github
    ?.tryFindWorkflow("release")
    ?.file?.patch(JsonPatch.replace("/jobs/release_npm/steps/0/with/node-version", "24.x"));

// remove once configured correctly to biome, mise and vitest components
project.npmignore?.addPatterns("biome.jsonc", "mise.toml", "vitest.config.ts");

project.synth();
