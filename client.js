var socket = new WebSocket('ws://websocket.example.com');

// Show a connected message when the WebSocket is opened.
socket.onopen = function(event) {
  console.log('WebSocket is connected.');
};

var socket = new WebSocket('ws://websocket.example.com');
socket.onopen = function(event) {
  socket.send('Some message'); // Sends data to server.
};

socket.onmessage = function(event) {
    var message = event.data;
    console.log(message);
  };