import express from 'express';

const router = express.Router();

const timelog = (request, response, next) => {
  const eventTime = new Date();
  console.log(`${eventTime.toLocaleDateString('ru-RU')} ${eventTime.toLocaleTimeString('ru-RU')}: ${request.method} — ${request.originalUrl}`);
  next();
}
router.use(timelog);

router.post('/', (request, response) => {
  const body = request.body;
  if (body.email === 'igsekor@gmail.com' && body.password === '12345678') {
    response.statusCode = 200;
    response.json({ token: 'aksdhoiaHWEfndkSLVcnBviqhWEFOIufsd0924375983uertjndsf' });
  } else {
    response.statusCode = 401;
    response.json({ answer: 'Unauthorized' });
  }
})

export default router;
