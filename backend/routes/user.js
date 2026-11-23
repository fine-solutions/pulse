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
      email: userEmail,
      name: 'Весь Самделов',
      about: 'Никому не делигирует то, что может сделать сам, то есть ничего!',
      complexity: '🦜',
    });
  }
})

export default router;
