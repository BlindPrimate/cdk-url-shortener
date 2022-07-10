import { v4 } from 'uuid'

export async function handler(event, context) {
    return {
        statusCode: 200,
        response: "Knock, Knock"
    }
}

