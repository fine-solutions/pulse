import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (request, response) => {
  response.send('Hello world!');
})

app.listen(port, host, (error) => {
  if (error) {
    console.error(`Сервер не был запущен из-за ошибки: ${error}`);
  }
  console.log(`Сервер запущен и доступен по адресу ${host}:${port}`);
})
