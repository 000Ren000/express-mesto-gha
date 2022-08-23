const jwt = require('jsonwebtoken');
const { TokenError } = require('../utils/utils');
// eslint-disable-next-line import/order
const secret = require('config').get('jwtSecret');

module.exports.jwtVerify = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new TokenError('Не правильно переданы данные');
    }
    const token = req.headers.authorization.replace('Bearer ', '');
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
