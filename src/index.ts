import * as path from "path";
import { BuildOptions } from "@mrgrain/cdk-esbuild";
import { Component, SourceCode } from "projen";
import { NodeProject } from "projen/lib/javascript";

/**
 * Options for the LambdaFunctionConstructGenerator
 */
export interface LambdaFunctionConstructGeneratorOptions {
    /**
     * Source directory where Lambda Function handlers are located
     *
     * @default "src/handlers"
     */
    readonly sourceDir?: string;

    /**
     * Output directory where Lambda Function constructs will be generated
     *
     * @default "src/constructs/lambda"
     */
    readonly outputDir?: string;

    /**
     * File pattern to identify Lambda Function handlers
     *
     * @default "*.lambda.ts"
     */
    readonly filePattern?: string;

    /**
     * esbuild options to customize the bundling process
     *
     * @default {}
     */
    readonly esbuildOptions?: BuildOptions;

    /**
     * Whether to automatically add the required dependencies
     *
     * @default true
     */
    readonly addDependencies?: boolean;

    /**
     * Import statement for the base construct
     *
     * @example "import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';"
     *
     * @default "import { aws_lambda } from 'aws-cdk-lib';"
     */
    readonly baseConstructImport?: string;

    /**
     * Name of the construct class to extend
     *
     * @example "NodejsFunction"
     *
     * @default "aws_lambda.Function"
     */
    readonly baseConstructClass?: string;

    /**
     * Package name to add as dependency for the base construct
     *
     * @example "aws-cdk-lib"
     *
     * @default "aws-cdk-lib"
     */
    readonly baseConstructPackage?: string;
}

/**
 * A projen component that generates AWS CDK Lambda Function constructs and bundles their code assets using esbuild.
 *
 * The bundling happens during projen execution, not during CDK synth, enabling a "build once, deploy many" pattern.
 */
export class LambdaFunctionConstructGenerator extends Component {
    public readonly sourceDir: string;
    public readonly outputDir: string;
    public readonly filePattern: string;
    public readonly esbuildOptions: BuildOptions;
    public readonly baseConstructImport?: string;
    public readonly baseConstructClass?: string;
    public readonly baseConstructPackage?: string;
    private readonly nodeProject: NodeProject;
    private readonly bundlerScriptPath: string;

    constructor(project: NodeProject, options?: LambdaFunctionConstructGeneratorOptions) {
        super(project);
        this.nodeProject = project;
        this.sourceDir = options?.sourceDir ?? "src/handlers";
        this.outputDir = options?.outputDir ?? "src/constructs/lambda";
        this.filePattern = options?.filePattern ?? "*.lambda.ts";
        this.esbuildOptions = options?.esbuildOptions ?? {};
        this.baseConstructImport = options?.baseConstructImport;
        this.baseConstructClass = options?.baseConstructClass;
        this.baseConstructPackage = options?.baseConstructPackage;

        // Create unique script name based on sourceDir and filePattern
        const uniqueId = this.createUniqueId(this.sourceDir, this.filePattern);
        this.bundlerScriptPath = path.join(".projen", `generate-and-bundle-${uniqueId}.ts`);

        // Add required dependencies
        if (options?.addDependencies ?? true) {
            this.addDependencies(options?.baseConstructPackage);
        }

        // Create the bundle task
        this.createBundleTask();

        // Add the bundle task to the build workflow
        this.addBundleTaskToWorkflow();
    }

    /**
     * Add required dependencies for the component
     */
    private addDependencies(additionalPackage?: string) {
        this.nodeProject.addDeps("aws-cdk-lib", "constructs");

        if (additionalPackage && additionalPackage !== "aws-cdk-lib" && additionalPackage !== "constructs") {
            this.nodeProject.addDeps(additionalPackage);
        }
    }

    /**
     * Create a unique ID based on sourceDir and filePattern
     */
    private createUniqueId(sourceDir: string, filePattern: string): string {
        // Remove special characters and convert to kebab case
        const dirPart = sourceDir.replace(/\//g, "-").replace(/[^\w-]/g, "");
        const patternPart = filePattern
            .replace(/\*/g, "")
            .replace(/\./g, "-")
            .replace(/[^\w-]/g, "");
        return `${dirPart}-${patternPart}`.replace(/--+/g, "-").replace(/^-|-$/g, "");
    }

    /**
     * Create the bundle task that will be executed during projen build
     */
    private createBundleTask() {
        const uniqueId = this.createUniqueId(this.sourceDir, this.filePattern);
        const taskName = `generate-and-bundle-${uniqueId}`;

        let baseConstructArgs = "";
        if (this.baseConstructImport) {
            baseConstructArgs += ` --base-construct-import '${this.baseConstructImport}'`;
        }
        if (this.baseConstructClass) {
            baseConstructArgs += ` --base-construct-class '${this.baseConstructClass}'`;
        }

        const bundleTask = this.nodeProject.addTask(taskName, {
            description: `Generate Lambda Function Constructs from ${this.sourceDir}/${this.filePattern} and bundle their handlers`,
            exec: `tsx --tsconfig tsconfig.dev.json ${this.bundlerScriptPath} --source-dir ${this.sourceDir} --output-dir ${this.outputDir} --file-pattern "${this.filePattern}" --esbuild-options '${JSON.stringify(this.esbuildOptions)}'${baseConstructArgs}`,
        });

        // Create the bundler script
        this.createBundlerScript();

        return bundleTask;
    }

    /**
     * Create the bundler script that will be executed by the bundle task
     */
    private createBundlerScript() {
        const bundlerScript = `// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".

import * as path from 'path';
import * as fs from 'fs';
import * as esbuild from 'esbuild';
import * as glob from 'glob';
import { pascalCase } from 'change-case';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('source-dir', { type: 'string', default: 'src/handlers', description: 'Source directory where Lambda Function handlers are located' })
    .option('output-dir', { type: 'string', default: 'src/constructs/lambda', description: 'Output directory where Lambda Function constructs will be generated' })
    .option('file-pattern', { type: 'string', default: '*.lambda.ts', description: 'File pattern to identify Lambda Function handlers' })
    .option('esbuild-options', { type: 'string', default: '{}', description: 'esbuild options as JSON string' })
    .option('base-construct-import', { type: 'string', description: 'Import statement for the base construct' })
    .option('base-construct-class', { type: 'string', description: 'Name of the construct class to extend' })
    .help()
    .parse();

  const sourceDir = argv['source-dir'];
  const outputDir = argv['output-dir'];
  const filePattern = argv['file-pattern'];
  const esbuildOptions = JSON.parse(argv['esbuild-options'] as string);
  const baseConstructImport = argv['base-construct-import'] as string | undefined;
  const baseConstructClass = argv['base-construct-class'] as string | undefined;

  // Ensure output directory exists
  fs.mkdirSync(path.join(process.cwd(), outputDir), { recursive: true });

  // Ensure assets directory exists
  const assetsDir = path.join(process.cwd(), 'assets', 'handlers');
  fs.mkdirSync(assetsDir, { recursive: true });

  // Find all Lambda Function handler files
  const handlerFiles = glob.sync(path.join(process.cwd(), sourceDir, filePattern));

  console.log(\`Found \${handlerFiles.length} Lambda Function handler files\`);

  // Process each handler file
  for (const handlerFile of handlerFiles) {
    const relativePath = path.relative(path.join(process.cwd(), sourceDir), handlerFile);
    const fileName = path.basename(relativePath, path.extname(relativePath));
    const functionName = fileName.replace('.lambda', '');

    console.log(\`Processing Lambda Function handler: \${functionName}\`);

    // Create function-specific directory
    const functionDir = path.join(assetsDir, functionName);
    fs.mkdirSync(functionDir, { recursive: true });

    // Bundle the handler code to index.js in the function directory
    const outfile = path.join(functionDir, 'index.js');

    try {
      await esbuild.build({
        entryPoints: [handlerFile],
        bundle: true,
        minify: true,
        platform: 'node',
        target: 'node18',
        outfile,
        ...esbuildOptions,
      });

      console.log(\`Successfully bundled \${functionName} to \${outfile}\`);

      // Generate the CDK construct
      const constructFilePath = path.join(process.cwd(), outputDir, \`\${functionName}.ts\`);
      const constructCode = generateConstructCode(functionName, relativePath, baseConstructImport, baseConstructClass);

      fs.writeFileSync(constructFilePath, constructCode);
      console.log(\`Generated construct at \${constructFilePath}\`);
    } catch (error) {
      console.error(\`Error processing \${functionName}:\`, error);
    }
  }
}

function generateConstructCode(functionName: string, handlerPath: string, baseConstructImport?: string, baseConstructClass?: string) {
  const constructName = \`\${pascalCase(functionName)}Function\`;

  // Default values if no baseConstruct is provided
  const importStatement = baseConstructImport ?? "";
  const baseClassName = baseConstructClass ?? "aws_lambda.Function";

  // Determine if we need to use aws_lambda.Runtime or not based on the base class
  const useAwsLambdaRuntime = !baseConstructClass || baseClassName.includes("Function");

  return \`// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".

import * as path from 'path';
import { fileURLToPath } from 'url';
\${importStatement}
import { aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Properties for \${constructName}
 */
export interface \${constructName}Props extends Omit<\${baseClassName === "aws_lambda.Function" ? "aws_lambda.FunctionProps" : \`\${baseClassName}Props\`}, 'code'\${useAwsLambdaRuntime ? " | 'runtime'" : ""} | 'handler'> {
  \${useAwsLambdaRuntime ? \`/**
   * Override the default runtime
   * @default nodejs22.x
   */
  readonly runtime?: aws_lambda.Runtime;\` : ""}
}

/**
 * \${constructName} - Lambda Function Construct for \${handlerPath}
 */
export class \${constructName} extends \${baseClassName} {
  constructor(scope: Construct, id: string, props: \${constructName}Props = {}) {
    super(scope, id, {
      ...props,
      \${useAwsLambdaRuntime ? "runtime: props.runtime ?? aws_lambda.Runtime.NODEJS_22_X," : ""}
      handler: 'index.handler',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, '../../../assets/handlers/\${functionName}')),
    });
  }
}
\`;
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
`;

        // Create source code file and add code lines to it
        const src = new SourceCode(this.project, this.bundlerScriptPath);
        const lines = bundlerScript.split("\n");
        for (const line of lines) {
            src.line(line);
        }

        // Add the dependencies needed for the bundler script
        this.nodeProject.addDevDeps("esbuild", "glob", "yargs", "@types/glob", "@types/yargs", "tsx", "change-case");
    }

    /**
     * Add the bundle task to the build workflow
     */
    private addBundleTaskToWorkflow() {
        // Get the compile task
        const compileTask = this.nodeProject.tasks.tryFind("compile");

        if (compileTask) {
            // Add the bundle task as a dependency of the compile task
            const uniqueId = this.createUniqueId(this.sourceDir, this.filePattern);
            const taskName = `generate-and-bundle-${uniqueId}`;
            const bundleTask = this.nodeProject.tasks.tryFind(taskName);
            if (bundleTask) {
                compileTask.prependSpawn(bundleTask);
            }
        }
    }
}
