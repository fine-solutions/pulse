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
    response.json([
      {
        id: 1,
        project: 1,
        title: 'Получить данные',
        icon: '🔬',
        status: {
          label: 'Все',
          color: 'black',
        },
        teams: [1, 2, 3],
        tasks: [1, 2, 3, 4, 5],
        progress: {
          done: 9,
          all: 12,
        },
      }
    ]);
  }
})

export default router;
