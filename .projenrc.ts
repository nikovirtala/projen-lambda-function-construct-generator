import { Vitest } from "@nikovirtala/projen-vitest";
import { cdk, javascript } from "projen";

const project = new cdk.JsiiProject({
    author: "Niko Virtala",
    authorAddress: "niko.virtala@hey.com",
    autoMerge: true,
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
        "@nikovirtala/projen-vitest",
        "esbuild",
        "glob",
        "yargs",
        "@types/glob",
        "@types/yargs",
        "tsx",
        "change-case",
    ],
    autoApproveOptions: {
        secret: "GITHUB_TOKEN",
        allowedUsernames: ["nikovirtala"],
    },
    jest: false,
    jsiiVersion: "~5.8.3",
    license: "MIT",
    licensed: true,
    name: "projen-lambda-function-construct-generator",
    npmAccess: javascript.NpmAccess.PUBLIC,
    packageManager: javascript.NodePackageManager.PNPM,
    packageName: "@nikovirtala/projen-lambda-function-construct-generator",
    peerDeps: ["aws-cdk-lib", "constructs", "projen"],
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
    typescriptVersion: "5.8.3",
});

new Vitest(project);

project.synth();
