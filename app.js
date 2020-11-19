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
    // console.log(responses);
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);

    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
    } else {
        console.log(`  No intent matched.`);
    }


    if (result.fulfillmentMessages.length == 1) {
        var ans = result.fulfillmentMessages[0].text.text;
    } else {
        var ans = "";
        for (var i = 0; i < result.fulfillmentMessages.length; i++) {
            ans += ` ${i+1}.${result.fulfillmentMessages[i].text.text} \n `;
        }
    }
    // console.log(ans);
    return ans;
}

// To recieve events on server side
io.on('connection', function(socket) {
    console.log('Socket connected...');

    // console.log(process.env);

    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath('student-support-system-294109', sessionId);

    socket.on('chat', async function(data) {
        var reply = await runSample(sessionPath, sessionClient, data.message);
        console.log("Response: " + JSON.stringify(reply));

        var response = {
            // message: reply.fulfillmentText
            message: JSON.stringify(reply)
        }
        socket.emit('chat', response);

    });
});