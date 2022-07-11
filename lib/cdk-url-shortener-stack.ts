import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { BasicTable } from '../infrastructure/shortener-db';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkUrlShortenerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new BasicTable(this, "ShortenURLTable", "ID")

    const shortenUrlLambda = new NodejsFunction(this, 'ShortenURL', {
      entry: join(__dirname, "..", "services", "lambdas", "shortener.ts"),
      runtime: Runtime.NODEJS_14_X,
      handler: "handler",
      environment: {
        TABLE_NAME: table.name
      }
    })

    table.addLambdaPermission(shortenUrlLambda)

    const apiGW = new LambdaRestApi(this, "ShortenURLapi", {
      handler: shortenUrlLambda,
      proxy: false
    })

    const createRoot = apiGW.root.addResource('create')
    createRoot.addMethod('POST')

  }
}
