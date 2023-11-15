const { CognitoIdentityServiceProvider, DynamoDB } = require('aws-sdk');

const cognitoProvider = new CognitoIdentityServiceProvider();
const dynamo = new DynamoDB.DocumentClient();


//----------------------------------------------------------------------------------------------------------------------
// Constants
//----------------------------------------------------------------------------------------------------------------------
const BATCH_LIMIT = 25;  // DynamoDB limit

const ENV_TABLE_MAP = {
    staging: 'rvb-click',
    master: 'rvb-click-prod',
};

const TABLE_NAME = ENV_TABLE_MAP[process.env.ENV];


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
// Database
//----------------------------------------------------------------------------------------------------------------------


const getColorCounts = async (username) => {
    const response = await dynamo.get({
        TableName: TABLE_NAME,
        Key: { id: username },
        ProjectionExpression: ['red', 'blue']
    }).promise();


    return response.Item;
};

const updateHourlyColorCount = async (timestamp, items) => {
    // Params for Batch Write
    const params = {
        RequestItems: {
            TABLE_NAME: []
        }
    };

    // Prepare each item for update
    for (let i = 0; i < items.length; i++) {
        params.RequestItems[TABLE_NAME].push({
            UpdateRequest: {
                TableName: TABLE_NAME,
                Key: { id: items[i].username },
                UpdateExpression: `SET clicks_hourly.#ts = :colors`,
                ExpressionAttributeNames: {
                    '#ts': timestamp
                },
                ExpressionAttributeValues: {
                    ':colors': items[i].counts
                },
            }
        });
    }

    try {
        await dynamo.batchWrite(params).promise();
    } catch (error) {
        console.error('Error updating hourly color count:', error);
        throw error;
    }
}


//----------------------------------------------------------------------------------------------------------------------
// Handler
//----------------------------------------------------------------------------------------------------------------------

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async () => {
    const hourlyEpoch = toHourlyEpochTs(new Date());

    try {
        // Make sure to set up user pool env variable in production
        const userPoolId = process.env.COGNITO_USER_POOL;
        let paginationToken = null;

        do {
            const params = {
                UserPoolId: userPoolId,
                AttributesToGet: ['sub'],           // Retrieve the username attribute
                PaginationToken: paginationToken,   // Pass the pagination token
                Limit: BATCH_LIMIT,
            };

            // Fetch Batch of Cognito users
            const response = await cognitoProvider.listUsers(params).promise();
            const usernames  = response.Users.map(user => user.Username);
            paginationToken = response.PaginationToken; // Update the pagination token for the next iteration

            const items = [];
            for (const username of usernames) {
                const colorCounts = await getColorCounts(username);
                items.push({
                    username,
                    counts: colorCounts,
                })
            }

            await updateHourlyColorCount(hourlyEpoch, items);
        } while (paginationToken);
    } catch (e) {
        console.log(e);
    }
};
