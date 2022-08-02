const User = require('../models/user');
const sendErrorMessage = (err, res) => {
	if (err.name === 'CastError')
		return res.status(400).send({message: 'Запрашиваемый пользователь не найден.'});
	if (err.name === 'ValidationError')
		return res.status(400).send({message: 'Не правильно введены данные'});
	return res.status(500).send({message: `Внутренняя ошибка сервера`});
}

module.exports.getUsersAll = async (req, res) => {
	try {
		const users = await User.find({})
		await res.send(200, users);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.getUser = async (req, res) => {
	try {
		const user = await User.find({_id: req.params.userId})
		await res.send(200, user);
	} catch (err) {sendErrorMessage(err, res)}

}

module.exports.createUser = async (req, res) => {
	try {
		const {name, about, avatar} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.create({name, about, avatar});
		await res.send(200, newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.updateProfile = async (req, res) => {
	try {
		const {name, about} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id, {name, about});
		await res.send(200, newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.updateAvatar = async (req, res) => {
	try {
		const {avatar} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id, {avatar});
		await res.send(200, newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

