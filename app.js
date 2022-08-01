const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const userRout = require('./routes/users');
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', userRout)

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});

