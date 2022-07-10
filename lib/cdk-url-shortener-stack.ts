import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkUrlShortenerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambdaNode = new NodejsFunction(this, 'hellowLambdaNode', {
      entry: join(__dirname, "..", "services", "lambdas", "shortener.ts"),
      handler: "handler"
    })

  }
}
