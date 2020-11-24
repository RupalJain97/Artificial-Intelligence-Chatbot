// Set environment variable to confidential  json file
// $env:GOOGLE_APPLICATION_CREDENTIALS="D:\Projects and Programs\Student-Support-System\student-support-system-296519-beac362daa52.json"

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 5500;
server.listen(port, () => {
    console.log("Listening server at port: " + port);
    console.log("open : https://localhost:" + port);
});

app.use(express.static("."));
process.env.GOOGLE_APPLICATION_CREDENTIALS;

app.get("/", function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});


const dialogflow = require('dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(sessionPath, sessionClient, question) {


    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: question,
                // The language used by the client (en-US)
                languageCode: 'en-US'
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);

    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }

    return result;
}

// To recieve events on server side
io.on('connection', function(socket) {
    console.log('Socket connected...');

    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath('student-support-system-296519', sessionId);

    socket.on('chat', async function(data) {
        var reply = await runSample(sessionPath, sessionClient, data.message);
        // console.log("Response: " + JSON.stringify(reply));

        if (reply.fulfillmentMessages.length == 1) {
            var ans = reply.fulfillmentMessages[0].text.text;
        } else {
            var ans = "";
            if (reply.intent.displayName == "courses" || reply.intent.displayName == "occupation" || reply.intent.displayName == "colleges") {
                for (var i = 0; i < reply.fulfillmentMessages.length; i++) {
                    ans += ` ${i+1}. ${reply.fulfillmentMessages[i].text.text} <br> `;
                }
            } else {
                for (var i = 0; i < reply.fulfillmentMessages.length; i++) {
                    ans += ` ${reply.fulfillmentMessages[i].text.text} <br> `;
                }
            }
        }
        console.log("Response: " + ans);
        var response = {
            message: ans
        }
        socket.emit('chat', response);

    });
});