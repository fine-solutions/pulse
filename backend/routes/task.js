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
        title: 'Сбор данных по климату за год',
        description: 'Во время сбора фиксировать количество образцов в отдельном еженедельном отчёте',
        number: 4,
        expire: 1715904000,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию'
        },
        team: {
          id: 1,
          title: 'Исследователи',
        },
        target: {
          id: 1,
          title: 'Получить данные',
        },
        uiMatrix: 2,
        complexity: {
          value: 5,
          dim: '🦜',
        },
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      },
      {
        id: 2,
        title: 'Получить разрешение на сбор образцов эндемичных растений',
        number: 7,
        expire: null,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию'
        },
        team: {
          id: 1,
          title: 'Исследователи',
        },
        target: {
          id: 1,
          title: 'Получить данные',
        },
        uiMatrix: 4,
        complexity: {
          value: 7,
          dim: '🦜',
        },
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      },
      {
        id: 3,
        title: 'Оплатить дорогу до Патагонии участникам экспедиции',
        number: 8,
        expire: null,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию'
        },
        team: {
          id: 2,
          title: 'Администраторы',
        },
        target: {
          id: 1,
          title: 'Получить данные',
        },
        uiMatrix: 1,
        complexity: null,
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      },
      {
        id: 4,
        title: 'Найти фотографа',
        description: 'Необходимо найти местного фотографа в идеале русскоговорящего, чтобы исключить недопонимание в подачи той или иной сцены',
        number: 12,
        expire: 1717372800,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию'
        },
        team: {
          id: 2,
          title: 'Администраторы',
        },
        target: {
          id: 1,
          title: 'Получить данные',
        },
        uiMatrix: 3,
        complexity: null,
        status: {
          label: 'Бэклог',
          color: 'black',
        },
      },
      {
        id: 5,
        title: 'Составить список эндемичных растений региона',
        description: 'Можно пользоваться местными библиотеками и гербариями',
        number: 6,
        expire: null,
        project: {
          id: 1,
          title: 'Экспедиция в Патагонию'
        },
        team: {
          id: 1,
          title: 'Исследователи',
        },
        target: {
          id: 1,
          title: 'Получить данные',
        },
        uiMatrix: 2,
        complexity: null,
        status: {
          label: 'Назначено',
          color: 'violet',
        },
      }
    ]);
  }
})

export default router;
