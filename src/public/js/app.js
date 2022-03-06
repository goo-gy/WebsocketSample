const socket = new WebSocket(`ws://${window.location.host}`);
const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form#message');
const nickNameForm = document.querySelector('form#nickname');

const types = {
  nickName: 'nickname',
  message: 'message',
};

const makeMessage = (type, payload) => JSON.stringify({ type, payload });

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
  const input = messageForm.querySelector('input');
  socket.send(makeMessage(types.message, input.value));
  input.value = '';
});

nickNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = nickNameForm.querySelector('input');
  socket.send(makeMessage(types.nickName, input.value));
  input.value = '';
});
