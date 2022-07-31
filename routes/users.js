const {getUsers} = require('../controllers/usersController');
const router = require('express').Router();

router.get('/', getUsers);

module.exports = router;