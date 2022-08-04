const User = require('../models/user');
const Card = require('../models/card');
const {sendErrorMessage, NOTFOUND_ERROR} = require('../utils/utils');
const userVerification = async (req, res) => {
  if (!await Card.exists({_id: req.params.cardId})) {
    res.status(NOTFOUND_ERROR).send({message: "Запрашиваемый пользователь не найден"});
    return true;
  }
  else  return false;
}


module.exports.getUsersAll = async (req, res) => {
	try {
		const users = await User.find({})
		await res.send(users);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.getUser = async (req, res) => {
  const _id = req.params.userId;
	try {
    if (!await User.exists({_id})) {
      res.status(NOTFOUND_ERROR).send({message: "Запрашиваемый пользователь не найден"});
      return;
    }
		const user = await User.find({_id})
		await res.send(user);
	} catch (err) {sendErrorMessage(err, res)}

}

module.exports.createUser = async (req, res) => {
	try {
		const {name, about, avatar} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.create({name, about, avatar});
		await res.status(201).send(newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.updateProfile = async (req, res) => {
	try {
		const {name, about} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id, {name, about});
		await res.send(newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

module.exports.updateAvatar = async (req, res) => {
	try {
		const {avatar} = req.body; // получим из объекта запроса имя и описание пользователя
		const newUser = await User.findByIdAndUpdate(req.user._id, {avatar});
		await res.send(newUser);
	} catch (err) {sendErrorMessage(err, res)}
}

