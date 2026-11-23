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
    response.json([{
      id: 1,
      title: 'Весь Самделов',
      description: 'Никому не делегирует то, что может сделать сам, то есть ничего!',
      image: '/images/default-member.png',
      large: '/images/default-member-large.png',
      projects: [1],
      targets: [1],
      tasks: [1, 2, 3, 4, 5],
      status: {
        label: 'Работа',
        color: 'black',
      },
      progress: {
        done: 3,
        all: 12,
      },
    }]);
  }
})

export default router;
