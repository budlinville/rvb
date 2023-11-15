/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DynamoDB } = require('aws-sdk');

const dynamo = new DynamoDB.DocumentClient();

//----------------------------------------------------------------------------------------------------------------------
// Constats
//----------------------------------------------------------------------------------------------------------------------

const GLOBAL_ID = 'global';

const ENV_TABLE_MAP = {
    staging: 'rvb-click',
    master: 'rvb-click-prod',
};

const TABLE_NAME = ENV_TABLE_MAP[process.env.ENV || 'staging'];

//----------------------------------------------------------------------------------------------------------------------
// Database
//----------------------------------------------------------------------------------------------------------------------

const getColorCounts = async () => {
    const response = await dynamo.get({
        TableName: TABLE_NAME,
        Key: { id: GLOBAL_ID },
        ProjectionExpression: ['red', 'blue']
    }).promise();

    return response.Item;
};

const updateHourlyColorCount = async (timestamp, red, blue) => {
    const response = await dynamo.update({
        TableName: TABLE_NAME,
        Key: { id: GLOBAL_ID },
        UpdateExpression: 'SET clicks_hourly.#ts = :colors',
        ExpressionAttributeNames: {
            '#ts': timestamp,
        },
        ExpressionAttributeValues: {
            ':colors': { red, blue }
        },
        ReturnValues: 'ALL_NEW',
    }).promise();

    return response;
}

//----------------------------------------------------------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------------------------------------------------------

// Strips minutes and seconds from Javascript Date and returns epoch timestamp string
const toHourlyEpochTs = (date) => {
    const newDate = new Date(date)
    newDate.setMilliseconds(0);
    newDate.setSeconds(0);
    newDate.setMinutes(0);
    return newDate.getTime().toString();
};

//----------------------------------------------------------------------------------------------------------------------
// Handler
//----------------------------------------------------------------------------------------------------------------------

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
    const hourlyEpoch = toHourlyEpochTs(new Date());

    const colorCounts = await getColorCounts();
    const { red, blue } = colorCounts;
    await updateHourlyColorCount(hourlyEpoch, red, blue);
};
