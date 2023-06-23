/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const db = require('./db/click');


// Constants
const GLOBAL_ID = 'global';


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});


/**********************
 * Example get method *
 **********************/

app.get('/rvb', function(req, res) {
    // Add your code here
    res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/rvb/clicks/user/:username', async (req, res, next) => {
    try {
        const username = req?.params?.username;
        userCounts = null;
        if (username) {
            userCounts = await db.getColorCounts(username);
        }
        const globalCounts = await db.getColorCounts(GLOBAL_ID);

        res.json({
            counts: {
                user: userCounts,
                global: globalCounts,
            }
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

app.get('/rvb/clicks', async (req, res, next) => {
    try {
        const response = await db.getColorCounts(GLOBAL_ID);
        res.json({ counts: response });
    } catch (error) {
        console.log({error});
        return next(error);
    }
});

app.get('/rvb/clicks/hourly', async (req, res, next) => {
    try {
        const response = await db.getHourlyColorCounts(GLOBAL_ID);
        res.json(response);
    } catch (error) {
        console.log({error});
        return next(error);
    }
});


/****************************
* Example post method *
****************************/

app.post('/rvb', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/rvb/click/:color', async (req, res, next) => {
    try {
        const color = req.params.color;
        if (!['red', 'blue'].includes(color))
            throw new Error('"color" paramater value must be "red" or "blue".');

        const { clicks } = req.body;
        if (clicks === 0) {
            res.json({ success: `No increment needed. "Clicks" value of "0" passed in` });
            return;  // TODO: Is this necessary?
        }

        if (!clicks)
            throw new Error('"Clicks" missing from request body.')

        // Get global information
        const globalCounts = await db.updateColorCount(GLOBAL_ID, color, clicks);

        // Get user information
        let userCounts = null;
        const { userDetails } = req.body;
        if (userDetails?.username) {
            userCounts = await db.updateColorCount(userDetails?.username, color, clicks);
        }

        res.json({
            success: `Successfully incremented "${color}" by ${clicks}`,
            global: {
                red: globalCounts.red,
                blue: globalCounts.blue,
            },
            user: !userCounts ? null : {
                red: userCounts.red,
                blue: userCounts.blue,
            },
        });
    } catch (error) {
        console.log(error)
        return next(error);
    }
});

app.post('/rvb/*', function(req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/rvb', function(req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/rvb/*', function(req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/rvb', function(req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/rvb/*', function(req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
