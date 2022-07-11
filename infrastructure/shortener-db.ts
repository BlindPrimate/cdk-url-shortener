import { RemovalPolicy, Stack } from "aws-cdk-lib"
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb"
import { Lambda } from "aws-cdk-lib/aws-ses-actions"



export class BasicTable {
    public name: string
    private primaryKey: string
    private stack: Stack
    private table: Table

    public constructor(stack: Stack, name: string, primaryKey: string) {
        this.name = name
        this.primaryKey = primaryKey
        this.stack = stack
        this.initialize()
    }

    private initialize() {
        this.createTable()
    }

    private createTable() {
        this.table = new Table(this.stack, this.name, {
            partitionKey: {
                name: this.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.name,
            removalPolicy: RemovalPolicy.DESTROY
        })
    }

    public addLambdaPermission(lambda: any) {
        this.table.grantReadWriteData(lambda)
    }
}