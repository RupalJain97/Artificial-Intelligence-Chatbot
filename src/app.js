var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var port = process.env.PORT || 5500;
app.use(express.static("."));
process.env.GOOGLE_APPLICATION_CREDENTIALS;

server.listen(port, function() {
    console.log("Listening server at port: " + port);
});

const dialogflow = require('dialogflow');

//package creates unque id bycryptography
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(sessionPath, sessionClient, ques) {

    // console.log("ques: " + ques);

    // A unique identifier for the given session
    // const sessionId = uuid.v4();

    // Create a new session
    // const sessionClient = new dialogflow.SessionsClient();
    // const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                // text: '2 medical college',
                text: ques,
                // The language used by the client (en-US)
                languageCode: 'English — en',
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    if (result.fulfillmentMessages.length == 1) {
        var ans = result.fulfillmentMessages[0].text.text;
    } else {
        var ans = "";
        for (var i = 0; i < result.fulfillmentMessages.length; i++) {
            ans += ` ${i+1}. ${result.fulfillmentMessages[i].text.text}. \n `;
        }
    }

    // console.log("ans: " + ans);
    // console.log(`  Query: ${result.queryText}`);
    // console.log(" Response:" + ans);
    // if (result.intent) {
    //   console.log(`  Intent: ${result.intent.displayName}`);
    // } else {
    //   console.log(`  No intent matched.`);
    // }

    return ans;
}


// To recieve events on server side
io.sockets.on('connection', function(socket) {
    console.log("Socket created :" + socket.id);

    // A unique identifier for the given session
    const sessionId = uuid.v4();

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath('student-support-system-294109', sessionId);

    socket.on('chat', async function(data) {
        // console.log("message: " + data.message);
        var reply = await runSample(sessionPath, sessionClient, data.message);
        console.log("Response: " + JSON.stringify(reply));
        var response = {
            message: reply,
            handle: "Expert"
        }
        socket.emit('chat', response);

    });

    // Catching typing msg
    // socket.on('typing', function (data) {
    // 	socket.broadcast.emit('typing', data);
    // });
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});