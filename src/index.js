// $(document).ready(function() {
//     $('#popup').modal('show');
// });

function popup_func() {
    var name = $('#user_name').val();
    if (name == "") {
        $('#error').html("<i>Name can't be left blank...</i>");
    } else {
        $('#popup').modal('hide');
    }

    if (name[0] == name[0].toLowerCase()) {
        name = name[0].toUpperCase() + name.slice(1);
    }
    document.getElementById('handle').value = name;
}

function popup_close() {
    var name = $('#user_name').val();
    if (name == "") {
        document.getElementById('handle').value = "Guest";
    } else {
        if (name[0] == name[0].toLowerCase()) {
            name = name[0].toUpperCase() + name.slice(1);
        }
        document.getElementById('handle').value = name;
        $('#popup').modal('hide');
    }
}

// Make connection on client side
var sockets = io.connect('http://localhost:5500');

var message = document.getElementById('message');
var output = document.getElementById('output');
var btn = document.getElementById('submit');
var typing = document.getElementById('typing');

// Functionality of submit button in Chatbot
btn.onclick = function() {
    if (message.value[0] == message.value[0].toLowerCase()) {
        message.value = message.value[0].toUpperCase() + message.value.slice(1);
    }
    // output.innerHTML += '<p id="user_msg">' +
    //     '<i class="fas fa-user-circle"></i>' +
    //     '<span id="msgbox"><b><i>  ' + handle.value + ' : </i></b>' + message.value + '</span></p>';
    output.innerHTML += '<p id="user_msg"> <span id="msgbox">' + message.value + '</span></p>';

    // sockets.emit('chat', {
    //     message: message.value,
    //     handle: handle.value
    // });
    sockets.emit('chat', {
        message: message.value
    });
    message.value = "";
}

// To braodacast typing mmessage
// message.onkeypress = function() {
//     sockets.emit('typing', handle.value);
// };

// sockets.on('typing', function(data) {
//     if (data[0] == data[0].toLowerCase()) {
//         data = data[0].toUpperCase() + data.slice(1);
//     }
//     typing.innerHTML = '' + data + ' is typing a message....';
// });

// To Output Data on Chatbot
sockets.on('chat', function(data) {
    typing.innerHTML = '';
    // if (data.handle[0] == data.handle[0].toLowerCase()) {
    //     data.handle = data.handle[0].toUpperCase() + data.handle.slice(1);
    // }
    if (data.message[0] == data.message[0].toLowerCase()) {
        data.message = data.message[0].toUpperCase() + data.message.slice(1);
    }
    // output.innerHTML += '<p><strong><i>' + data.handle + ': </i></strong>' + data.message + '</p>';
    // output.innerHTML += '<p><i class="fas fa-chalkboard-teacher"></i>' +
    //     '<span id="msgbox"><strong><i>  ' + data.handle + ': </i></strong>' + data.message + '</span></p>';
    output.innerHTML += '<p id="user_msg"> <span id="msgbox">' + message.value + '</span></p>';
    message.value = '';
});