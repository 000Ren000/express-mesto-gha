const {getUsersAll, getUser} = require('../controllers/usersController');
const router = require('express').Router();

// GET /users — возвращает всех пользователей
router.get('/', getUsersAll);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUser)


module.exports = router;