import 'dotenv/config';
import express from 'express';

import memberRouter from './routes/member.js';
import projectRouter from './routes/project.js';
import targetRouter from './routes/target.js';
import taskRouter from './routes/task.js';
import teamRouter from './routes/team.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
const version = process.env.VERSION;

app.use(express.json());

app.use(`/api/v${version}/member`, memberRouter);
app.use(`/api/v${version}/project`, projectRouter);
app.use(`/api/v${version}/target`, targetRouter);
app.use(`/api/v${version}/task`, taskRouter);
app.use(`/api/v${version}/team`, teamRouter);
app.use(`/api/v${version}/user`, userRouter);
app.use(`/api/v${version}/auth`, authRouter);

app.listen(port, host, (error) => {
  if (error) {
    console.error(`Сервер не был запущен из-за ошибки: ${error}`);
  }
  console.log(`Сервер запущен и доступен по адресу ${host}:${port}`);
})
