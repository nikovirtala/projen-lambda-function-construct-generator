# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LambdaFunctionConstructGenerator <a name="LambdaFunctionConstructGenerator" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator"></a>

A projen component that generates AWS CDK Lambda Function constructs and bundles their code assets using esbuild.

The bundling happens during projen execution, not during CDK synth, enabling a "build once, deploy many" pattern.

#### Initializers <a name="Initializers" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.Initializer"></a>

```typescript
import { LambdaFunctionConstructGenerator } from '@nikovirtala/projen-lambda-function-construct-generator'

new LambdaFunctionConstructGenerator(project: NodeProject, options?: LambdaFunctionConstructGeneratorOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.Initializer.parameter.project">project</a></code> | <code>projen.javascript.NodeProject</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.Initializer.parameter.options">options</a></code> | <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions">LambdaFunctionConstructGeneratorOptions</a></code> | *No description.* |

---

##### `project`<sup>Required</sup> <a name="project" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.Initializer.parameter.project"></a>

- *Type:* projen.javascript.NodeProject

---

##### `options`<sup>Optional</sup> <a name="options" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.Initializer.parameter.options"></a>

- *Type:* <a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions">LambdaFunctionConstructGeneratorOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isConstruct"></a>

```typescript
import { LambdaFunctionConstructGenerator } from '@nikovirtala/projen-lambda-function-construct-generator'

LambdaFunctionConstructGenerator.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isComponent"></a>

```typescript
import { LambdaFunctionConstructGenerator } from '@nikovirtala/projen-lambda-function-construct-generator'

LambdaFunctionConstructGenerator.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.esbuildOptions">esbuildOptions</a></code> | <code>@mrgrain/cdk-esbuild.BuildOptions</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.filePattern">filePattern</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.outputDir">outputDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.sourceDir">sourceDir</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructClass">baseConstructClass</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructImport">baseConstructImport</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructPackage">baseConstructPackage</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---

##### `esbuildOptions`<sup>Required</sup> <a name="esbuildOptions" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.esbuildOptions"></a>

```typescript
public readonly esbuildOptions: BuildOptions;
```

- *Type:* @mrgrain/cdk-esbuild.BuildOptions

---

##### `filePattern`<sup>Required</sup> <a name="filePattern" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.filePattern"></a>

```typescript
public readonly filePattern: string;
```

- *Type:* string

---

##### `outputDir`<sup>Required</sup> <a name="outputDir" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.outputDir"></a>

```typescript
public readonly outputDir: string;
```

- *Type:* string

---

##### `sourceDir`<sup>Required</sup> <a name="sourceDir" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.sourceDir"></a>

```typescript
public readonly sourceDir: string;
```

- *Type:* string

---

##### `baseConstructClass`<sup>Optional</sup> <a name="baseConstructClass" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructClass"></a>

```typescript
public readonly baseConstructClass: string;
```

- *Type:* string

---

##### `baseConstructImport`<sup>Optional</sup> <a name="baseConstructImport" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructImport"></a>

```typescript
public readonly baseConstructImport: string;
```

- *Type:* string

---

##### `baseConstructPackage`<sup>Optional</sup> <a name="baseConstructPackage" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGenerator.property.baseConstructPackage"></a>

```typescript
public readonly baseConstructPackage: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### LambdaFunctionConstructGeneratorOptions <a name="LambdaFunctionConstructGeneratorOptions" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions"></a>

Options for the LambdaFunctionConstructGenerator.

#### Initializer <a name="Initializer" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.Initializer"></a>

```typescript
import { LambdaFunctionConstructGeneratorOptions } from '@nikovirtala/projen-lambda-function-construct-generator'

const lambdaFunctionConstructGeneratorOptions: LambdaFunctionConstructGeneratorOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.addDependencies">addDependencies</a></code> | <code>boolean</code> | Whether to automatically add the required dependencies. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructClass">baseConstructClass</a></code> | <code>string</code> | Name of the construct class to extend. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructImport">baseConstructImport</a></code> | <code>string</code> | Import statement for the base construct. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructPackage">baseConstructPackage</a></code> | <code>string</code> | Package name to add as dependency for the base construct. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.esbuildOptions">esbuildOptions</a></code> | <code>@mrgrain/cdk-esbuild.BuildOptions</code> | esbuild options to customize the bundling process. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.filePattern">filePattern</a></code> | <code>string</code> | File pattern to identify Lambda Function handlers. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.outputDir">outputDir</a></code> | <code>string</code> | Output directory where Lambda Function constructs will be generated. |
| <code><a href="#@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.sourceDir">sourceDir</a></code> | <code>string</code> | Source directory where Lambda Function handlers are located. |

---

##### `addDependencies`<sup>Optional</sup> <a name="addDependencies" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.addDependencies"></a>

```typescript
public readonly addDependencies: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to automatically add the required dependencies.

---

##### `baseConstructClass`<sup>Optional</sup> <a name="baseConstructClass" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructClass"></a>

```typescript
public readonly baseConstructClass: string;
```

- *Type:* string
- *Default:* "aws_lambda.Function"

Name of the construct class to extend.

---

*Example*

```typescript
"NodejsFunction"
```


##### `baseConstructImport`<sup>Optional</sup> <a name="baseConstructImport" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructImport"></a>

```typescript
public readonly baseConstructImport: string;
```

- *Type:* string
- *Default:* "import { aws_lambda } from 'aws-cdk-lib';"

Import statement for the base construct.

---

*Example*

```typescript
"import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';"
```


##### `baseConstructPackage`<sup>Optional</sup> <a name="baseConstructPackage" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.baseConstructPackage"></a>

```typescript
public readonly baseConstructPackage: string;
```

- *Type:* string
- *Default:* "aws-cdk-lib"

Package name to add as dependency for the base construct.

---

*Example*

```typescript
"aws-cdk-lib"
```


##### `esbuildOptions`<sup>Optional</sup> <a name="esbuildOptions" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.esbuildOptions"></a>

```typescript
public readonly esbuildOptions: BuildOptions;
```

- *Type:* @mrgrain/cdk-esbuild.BuildOptions
- *Default:* {}

esbuild options to customize the bundling process.

---

##### `filePattern`<sup>Optional</sup> <a name="filePattern" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.filePattern"></a>

```typescript
public readonly filePattern: string;
```

- *Type:* string
- *Default:* "*.lambda.ts"

File pattern to identify Lambda Function handlers.

---

##### `outputDir`<sup>Optional</sup> <a name="outputDir" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.outputDir"></a>

```typescript
public readonly outputDir: string;
```

- *Type:* string
- *Default:* "src/constructs/lambda"

Output directory where Lambda Function constructs will be generated.

---

##### `sourceDir`<sup>Optional</sup> <a name="sourceDir" id="@nikovirtala/projen-lambda-function-construct-generator.LambdaFunctionConstructGeneratorOptions.property.sourceDir"></a>

```typescript
public readonly sourceDir: string;
```

- *Type:* string
- *Default:* "src/handlers"

Source directory where Lambda Function handlers are located.

---



