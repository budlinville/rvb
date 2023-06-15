const { DynamoDB } = require('aws-sdk');

const GLOBAL_ID = 'global'

const dynamo = new DynamoDB.DocumentClient();


const updateColorCount = async (color, value) => {
    const response = await dynamo.update({
        TableName: 'rvb-click',
        Key:                        { id: GLOBAL_ID },
        UpdateExpression: "ADD #color :color_value",
        ExpressionAttributeNames:   { '#color': color },
        ExpressionAttributeValues:  { ':color_value': value },
        ReturnValues: 'ALL_NEW',
    }).promise();

    return response;
};


const getColorCounts = async () => {
    const response = await dynamo.get({
        TableName: 'rvb-click',
        Key: { id: GLOBAL_ID },
        ProjectionExpression: ['red', 'blue']
    }).promise();

    return response.Item;
};


module.exports = {
    updateColorCount,
    getColorCounts,
};