const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
	try {
		const user = await User.find({})
		res.send(200, user);
	}
	catch (err) {res.send(500, 'Не получилось получить данные о пользователях')}
}