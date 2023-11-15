const { DynamoDB } = require('aws-sdk');


const dynamo = new DynamoDB.DocumentClient();

//----------------------------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------------------------
const ENV_TABLE_MAP = {
    staging: 'rvb-click',
    master: 'rvb-click-prod',
};

const TABLE_NAME = ENV_TABLE_MAP[process.env.ENV || 'staging'];


//----------------------------------------------------------------------------------------------------------------------
// Queries
//----------------------------------------------------------------------------------------------------------------------

const getHourlyColorCounts = async (userId) => {
    const response = await dynamo.get({
        TableName:              TABLE_NAME,
        Key:                    { id: userId },
        ProjectionExpression:   'clicks_hourly'
    }).promise();

    return response.Item;
}

//----------------------------------------------------------------------------------------------------------------------
// Mutations
//----------------------------------------------------------------------------------------------------------------------

const updateColorCount = async (userId, color, value) => {
    const response = await dynamo.update({
        TableName:                  TABLE_NAME,
        Key:                        { id: userId },
        UpdateExpression:           "ADD #color :color_value",
        ExpressionAttributeNames:   { '#color': color },
        ExpressionAttributeValues:  { ':color_value': value },
        ReturnValues:               'ALL_NEW',
    }).promise();

    return response.Attributes;
};


const getColorCounts = async (userId) => {
    const response = await dynamo.get({
        TableName:              TABLE_NAME,
        Key:                    { id: userId },
        ProjectionExpression:   ['red', 'blue']
    }).promise();

    return response.Item;
};

//----------------------------------------------------------------------------------------------------------------------
// Exports
//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    updateColorCount,
    getColorCounts,
    getHourlyColorCounts,
};