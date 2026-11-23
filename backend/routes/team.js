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
        id: 0,
        title: 'Весь Самделов',
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-member.png',
        large: '/images/default-member-large.png',
        targets: [1],
        status: null,
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 1,
        title: 'Исследователи',
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 2,
        title: 'Администраторы',
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 3,
        title: 'Гиды',
        projects: [1],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: [1],
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 4,
        title: 'Разработчики',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 5,
        title: 'Дизайнеры',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      },
      {
        id: 6,
        title: 'Тестировщики',
        projects: [2],
        members: [1],
        icon: '',
        image: '/images/default-team.png',
        large: '/images/default-team-large.png',
        targets: null,
        status: {
          label: 'Все',
          color: 'black',
        },
        progress: {
          done: 9,
          all: 12,
        },
      }
    ])
  }
})

export default router;
