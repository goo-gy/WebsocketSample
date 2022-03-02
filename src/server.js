import express from 'express';

const app = express();

const handleListen = () => console.log('Listening on 4000');

app.listen(4000, handleListen);
