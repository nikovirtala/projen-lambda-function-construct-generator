# Product Overview

This is a projen component that generates AWS CDK Lambda Function constructs and bundles their code assets using esbuild.

## Key Features

- Automatically discovers Lambda Function handlers in a specified directory
- Generates type-safe CDK constructs for each Lambda handler
- Bundles Lambda code assets using esbuild during projen execution (not during CDK synth)
- Enables "build once, deploy many" pattern for Lambda Functions
- Supports customization of esbuild bundling options and base construct classes
- Allows multiple generator instances with different configurations

## Target Users

Developers building AWS CDK applications with TypeScript who want to:
- Automate Lambda construct generation from handler files
- Pre-bundle Lambda code during build time rather than synth time
- Maintain type-safe, reusable Lambda constructs
- Follow consistent patterns across multiple Lambda functions
