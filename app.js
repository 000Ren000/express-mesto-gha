const express = require('express');
const mongoose = require('mongoose');
const cardRout = require('./routes/cards');
const userRout = require('./routes/users');
const { login, createUser } = require('./controllers/usersController');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '62e76e7e7b019e4c7694af62',
  };
  next();
});

app.use(express.json({ extended: true }));
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', userRout);
app.use('/cards', cardRout);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Ссылка на сервер', BASE_PATH);
});
