$(document).ready(function() {
    $('#popup').modal('show');
});

function popup_func() {
    var name = $('#user_name').val();
    $('#popup').modal('hide');
    if (name[0] == name[0].toLowerCase()) {
        name = name[0].toUpperCase() + name.slice(1);
    }
    document.getElementById('userName').innerHTML += 'Hey ' + name + ' !!! Nice to meet you';
}

var message = document.getElementById('handle');
var output = document.getElementById('output');
var btn = document.getElementById('submit');
var typing = document.getElementById('typing');

// Functionality of submit button in Chatbot
function messageSubmit() {
    output.innerHTML += '<p id="user_msg">' + message.value + '</p>';
    output.scrollTop = output.scrollHeight;

    socket.emit('chat', {
        message: message.value
    });
    message.value = "";
}

// Make connection on client side
var socket = io.connect('http://localhost:5500');

// To Output Data on Chatbot
socket.on('chat', function(data) {
    output.innerHTML += '<p id="bot_msg">' + data.message + '</p>';
    output.scrollTop = output.scrollHeight;
});