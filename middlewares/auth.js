const jwt = require('jsonwebtoken');
const { TokenError } = require('../utils/utils');
// eslint-disable-next-line import/order
const secret = require('config').get('jwtSecret');

// const errorMessage = (res) => {
//   res.status(TokenError)
//     .json({ message: 'Не правильно введены данные' });
// };
// eslint-disable-next-line consistent-return
module.exports.jwtVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new TokenError('Не правильно переданы данные');
    }
    const token = req.headers.authorization
      .split(' ')[1] || 'ggg';
    // eslint-disable-next-line consistent-return
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        throw new TokenError('Не правильно переданы данные');
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    next(err);
  }
};
