const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const cardRout = require('./routes/cards');
const userRout = require('./routes/users');
const { login, createUser } = require('./controllers/usersController');
const { jwtVerify } = require('./middlewares/auth');

const PORT = config.get('port') || 3000;
const { BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json({ extended: true }));
app.use(bodyParser.json());
app.post('/signin', login);
app.post('/signup', createUser);

app.use(jwtVerify);
app.use('/users', userRout);
app.use('/cards', cardRout);

// Мидла обработки ошибок
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
