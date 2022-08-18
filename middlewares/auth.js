const jwt = require('jsonwebtoken');
const { TOKEN_ERROR_401 } = require('../utils/utils');
// eslint-disable-next-line import/order
const secret = require('config').get('jwtSecret');

const errorMessage = (res, next) => {
  res.status(TOKEN_ERROR_401)
    .json({ message: 'Не правильно введены данные' });
  next();
};
module.exports.jwtVerify = (req, res, next) => {
  try {
    const token = req.headers.authorization
      .split(' ')[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return errorMessage(res, next);
      }
      req.user = payload;
      res
        .status(201)
        .send({ _id: payload._id });
      // eslint-disable-next-line consistent-return
      return next();
    });
  } catch (err) {
    return errorMessage(res, next);
  }
};
