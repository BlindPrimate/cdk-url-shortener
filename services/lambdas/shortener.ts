import { DynamoDB } from 'aws-sdk'
import { nanoid } from 'nanoid'

export async function handler(event, context) {
    const uuid = nanoid(6)
    const dynamo = new DynamoDB()
    const payload = JSON.parse(event.body)
    const resp = await dynamo.putItem({
        TableName: process.env.TABLE_NAME,
        Item: {
            "ID": {
                S: uuid
            },
            "url": {
                S: payload.url
            }
        }
    }).promise()
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true,
            'Content-Type': 'text/json'
        },
        body: JSON.stringify({
            result: "success",
            short: payload
        })
    }
}

