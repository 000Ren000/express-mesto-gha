const jwt = require('jsonwebtoken');
const secret = require('config').get('jwtSecret');

module.exports.jwtVerify = (req, res, next) => {
  const token = req.headers.authorization
    .split(' ')[1];
  // eslint-disable-next-line consistent-return
  jwt.verify(token, secret, (err, payload) => {
    if (err) return next();
    req.user = payload;
    res.send({ _id: payload._id });
    next();
  });
};
