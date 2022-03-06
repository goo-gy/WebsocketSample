import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const types = {
  nickName: 'nickname',
  message: 'message',
};

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/*', (req, res) => {
  res.redirect('/');
});

const httpServer = http.createServer(app);
const ws = new WebSocket.Server({ server: httpServer });

let socketList = [];

ws.on('connection', (socket) => {
  socketList.push(socket);
  console.log(`Connected! (${socket})`);
  socket['nickName'] = 'anony';

  socket.on('message', (message) => {
    const data = JSON.parse(message.toString());
    console.log(data);
    switch (data.type) {
      case types.message:
        socketList.forEach((eachSocket) => {
          eachSocket.send(`${socket['nickName']}: ${data.payload}`);
        });
        break;
      case types.nickName:
        socket['nickName'] = data.payload;
        break;
    }
  });

  socket.on('close', () => {
    console.log(`Disconnected!! (${socket})`);
    socketList = socketList.filter((item) => item !== socket);
  });
});

const handleListen = () => console.log('Listening on 3000');
httpServer.listen(3000, handleListen);
