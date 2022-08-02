const User = require('../models/user');

module.exports.getUsersAll = async (req, res) => {
	try {
		const users = await User.find({})
		await res.send(200, users);
	}
	catch (err) {res.status(500).json({message:'Не получилось получить данные о пользователях'})}
}

module.exports.getUser = async (req, res) => {
	try {
		const user = await User.find({_id: req.params.userId})
		await res.send(200, user);
	}
	catch (err) {res.status(500).json({message:'Не получилось получить данные о пользователях'})}
}

module.exports.createUser = async (req, res) => {
	try {
		const { name, about, avatar } = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.create({ name, about, avatar });
		await res.send(200, newUser);
	}
	catch (err) {res.status(500).json({message:'Не получилось cоздать пользователя'})}
}

module.exports.updateProfile = async (req, res) => {
	try {
		const { name, about } = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id,{ name, about });
		await res.send(200, newUser);
	}
	catch (err) {res.status(500).json({message:'Не получилось cоздать пользователя'})}
}

module.exports.updateAvatar = async (req, res) => {
	try {
		const { avatar} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id,{ avatar });
		await res.send(200, newUser);
	}
	catch (err) {res.status(500).json({message:'Не получилось cоздать пользователя'})}
}

