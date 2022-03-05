const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageInput = document.querySelector('input');
const messageForm = document.querySelector('form');

socket.addEventListener('open', () => {
  console.log('Connected to Server!');
});

socket.addEventListener('close', () => {
  console.log('Disconnected...');
});

socket.addEventListener('message', (message) => {
  console.log('Server Says:', message.data);
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.send(messageInput.value);
  messageInput.value = '';
});
