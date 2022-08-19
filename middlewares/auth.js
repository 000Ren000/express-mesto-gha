const jwt = require('jsonwebtoken');
const { TOKEN_ERROR_401 } = require('../utils/utils');
// eslint-disable-next-line import/order
const secret = require('config').get('jwtSecret');

const errorMessage = (res) => {
  res.status(TOKEN_ERROR_401)
    .json({ message: 'Не правильно введены данные' });
};
// eslint-disable-next-line consistent-return
module.exports.jwtVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization
      .split(' ')[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        errorMessage(res);
        return;
      }
      req.user = payload;
      // eslint-disable-next-line consistent-return
      next();
    });
  } catch (err) {
    errorMessage(res);
  }
};
