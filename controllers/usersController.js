const User = require('../models/user');

module.exports.getUsersAll = async (req, res) => {
	try {
		const users = await User.find({})
		res.send(200, users);
	}
	catch (err) {res.send(500, 'Не получилось получить данные о пользователях')}
}

module.exports.getUser = async (req, res) => {
	try {
		const user = await User.find({_id: req.params.userId})
		res.send(200, user);
	}
	catch (err) {res.send(500, 'Не получилось получить данные о пользователях')}
}