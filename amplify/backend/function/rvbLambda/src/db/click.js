const { DynamoDB } = require('aws-sdk');

const GLOBAL_ID = 'global'

const dynamo = new DynamoDB.DocumentClient();

const updateColor = async (color, value) => {
    const response = await dynamo.update({
        TableName: 'rvb-click',
        Key:                        { id: GLOBAL_ID },
        UpdateExpression: "set #color = :color_value",
        ExpressionAttributeNames:   { '#color': color },
        ExpressionAttributeValues:  { ':color_value': value },
        ReturnValues: 'ALL_NEW',
    }).promise();

    return response;
}

module.exports = updateColor;