const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('Connected to Server!');
});

socket.addEventListener('close', () => {
  console.log('Disconnected...');
});

socket.addEventListener('message', (message) => {
  console.log('Server Says:', message.data);
});

setTimeout(() => {
  socket.send('Hello Im ther browser!!');
}, 5000);
