import express from 'express';

import { isTokenValid } from '../auth/token.js';

const router = express.Router();

const timelog = (request, response, next) => {
  const eventTime = new Date();
  console.log(`${eventTime.toLocaleDateString('ru-RU')} ${eventTime.toLocaleTimeString('ru-RU')}: ${request.method} — ${request.originalUrl}`);
  next();
}
router.use(timelog);

router.get('/', (request, response) => {
  if (isTokenValid(request, response)) {
    response.json({
      id: 1,
      title: 'Экспедиция в Патагонию',
      icon: '⛵️',
      status: {
        label: 'Путешествия',
        color: 'violet',
      },
      target: 1,
      teams: [1, 2, 3],
      tasks: [1, 2, 3, 4, 5],
      progress: {
        done: 3,
        all: 12,
      },
    },
    {
      id: 2,
      title: 'Приложение «Пульс»',
      icon: '🚧',
      status: {
        label: 'Работа',
        color: 'black',
      },
      target: 1,
      teams: [4, 5, 6],
      tasks: [],
      progress: {
        done: 7,
        all: 12,
      },
    },
    {
      id: 3,
      title: 'Обучение игре на гитаре',
      icon: '🎸',
      status: {
        label: 'Обучение',
        color: 'green',
      },
      target: 1,
      teams: [],
      tasks: [],
      progress: {
        done: 3,
        all: 12,
      },
    },
    {
      id: 4,
      title: 'Поездка в Костёнки',
      icon: '🦣',
      status: {
        label: 'Путешествия',
        color: 'violet',
      },
      target: 1,
      teams: [],
      tasks: [],
      progress: {
        done: 7,
        all: 12,
      },
    },
    {
      id: 5,
      title: 'Система развёртывания для приложения «Пульс»',
      icon: '🛠️',
      status: {
        label: 'Работа',
        color: 'black',
      },
      target: 1,
      teams: [],
      tasks: [],
      progress: {
        done: 3,
        all: 12,
      },
    },
    {
      id: 6,
      title: 'Генеративные нейросети',
      icon: '🧠',
      status: {
        label: 'Обучение',
        color: 'green',
      },
      target: 1,
      teams: [],
      tasks: [],
      progress: {
        done: 7,
        all: 12,
      },
    });
  }
})

export default router;
