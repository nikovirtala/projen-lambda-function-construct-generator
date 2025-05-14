# projen-lambda-function-construct-generator

A [projen](https://github.com/projen/projen) component to generate AWS CDK Lambda Function constructs and bundle their code assets using [esbuild](https://esbuild.github.io/).

## Features

- Automatically discovers Lambda Function handlers in a specified directory
- Generates CDK Construct for each Lambda Function handler
- Bundles Lambda code assets using esbuild during projen execution (not during CDK synth)
- Supports customization of esbuild bundling options
- Enables "build once, deploy many" pattern for Lambda Functions

## Installation

```bash
npm install @nikovirtala/projen-lambda-function-construct-generator
# or
yarn add @nikovirtala/projen-lambda-function-construct-generator
# or
pnpm add @nikovirtala/projen-lambda-function-construct-generator
```

## Usage

In your `.projenrc.ts` file:

```typescript
import { awscdk } from "projen";
import { LambdaFunctionConstructGenerator } from "@nikovirtala/projen-lambda-function-construct-generator";

const project = new awscdk.AwsCdkTypeScriptApp({
    // ... your project configuration
});

new LambdaFunctionConstructGenerator(project, {
    // Optional: customize the source directory where Lambda Function handlers are located
    sourceDir: "src/handlers",

    // Optional: customize the output directory where Lambda Function constructs will be generated
    outputDir: "src/constructs/lambda",

    // Optional: customize the file pattern to identify Lambda Function handlers
    filePattern: "*.lambda.ts",

    // Optional: customize esbuild options
    esbuildOptions: {
        minify: true,
        sourcemap: true,
        // Any other esbuild options
    },
});

project.synth();
```

## Lambda Handler Example

Create a Lambda Function handler file in your source directory (e.g., `src/handlers/hello.lambda.ts`):

```typescript
export async function handler(event: any, context: any) {
    console.log("Event:", JSON.stringify(event, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello from Lambda!",
            event,
        }),
    };
}
```

## Generated Construct

The component will generate a CDK construct for each Lambda Function handler (e.g., `src/constructs/lambda/hello.ts`):

```typescript
import * as path from "path";
import { aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";

/**
 * Properties for HelloFunction
 */
export interface HelloFunctionProps extends Omit<aws_lambda.FunctionProps, "code" | "runtime" | "handler"> {
    /**
     * Override the default runtime
     * @default nodejs22.x
     */
    readonly runtime?: aws_lambda.Runtime;
}

/**
 * Lambda Function Construct for hello.lambda.ts
 */
export class HelloFunction extends aws_lambda.Function {
    constructor(scope: Construct, id: string, props: HelloFunctionProps = {}) {
        super(scope, id, {
            ...props,
            runtime: props.runtime ?? aws_lambda.Runtime.NODEJS_22_X,
            handler: "index.handler",
            code: aws_lambda.Code.fromAsset(path.join(__dirname, "../../../assets/handlers/hello")),
        });
    }
}
```

## Using the Generated Construct

In your CDK stack:

```typescript
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { HelloFunction } from "../constructs/lambda/hello";

export class MyStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const helloFunction = new HelloFunction(this, "HelloFunction", {
            memorySize: 256,
            timeout: cdk.Duration.seconds(30),
            environment: {
                EXAMPLE_VAR: "example-value",
            },
        });
    }
}
```

## License

MIT
