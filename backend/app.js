const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const cardRout = require('./routes/cards');
const userRout = require('./routes/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/usersController');
const { jwtVerify } = require('./middlewares/auth');
const { validateURL } = require('./utils/utils');
const { NotFoundError } = require('./utils/Errors/NotFoundError');
const bcrypt = require('bcrypt');
const { SAL_ROUND } = require('./config');
const User = require('./models/user');
const { DataChangeError } = require('./utils/Errors/DataChangeError');
const { ErrorCode } = require('./utils/Errors/ErrorCode');

const PORT = config.get('port') || 3000;
const { BASE_PATH } = process.env;
const app = express();

const corsOptions = {
  origin: 'https://mesto.antonren.ru',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger); // подключаем логгер запросов
app.use(cors(corsOptions));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
}), createUser);

app.use(jwtVerify);
app.use('/users', userRout);
app.use('/cards', cardRout);

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер', BASE_PATH);
});
