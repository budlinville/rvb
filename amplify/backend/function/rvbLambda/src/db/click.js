const { DynamoDB } = require('aws-sdk');

const dynamo = new DynamoDB.DocumentClient();


const updateColorCount = async (userId, color, value) => {
    const response = await dynamo.update({
        TableName: 'rvb-click',
        Key:                        { id: userId },
        UpdateExpression: "ADD #color :color_value",
        ExpressionAttributeNames:   { '#color': color },
        ExpressionAttributeValues:  { ':color_value': value },
        ReturnValues: 'ALL_NEW',
    }).promise();

    return response;
};


const getColorCounts = async (userId) => {
    const response = await dynamo.get({
        TableName: 'rvb-click',
        Key: { id: userId },
        ProjectionExpression: ['red', 'blue']
    }).promise();

    return response.Item;
};


module.exports = {
    updateColorCount,
    getColorCounts,
};