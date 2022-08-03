const Card = require('../models/card');

const sendErrorMessage = (err, res) => {
	if (err.name === 'CastError')
		return res.status(404).send({message: 'Запрашиваемая карточка не найдена'});
	if (err.name === 'ValidationError')
		return res.status(400).send({message: 'Не правильно введены данные'});
	return res.status(500).send({message: `Внутренняя ошибка сервера`});
}

//Методы работы с карточками

// GET /cards — возвращает все карточки
module.exports.getCardAll = async (req, res) => {
	try {
		const allCard = await Card.find({});
		await res.send(200, allCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}

// POST /cards — создаёт карточку
module.exports.createCard = async (req, res) => {
	try {
		const {name, link} = req.body;
		const newCard = await Card.create({name, link, owner: req.user._id});
		await res.send(200, newCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = async (req, res) => {
	try {
		const {cardId} = req.params;
		await Card.deleteOne({_id: cardId});
		await res.send(200, {message: "Карточка удалена!"})
	} catch (err) {
		sendErrorMessage(err, res)
	}
}

module.exports.likeCard = async (req, res) => {
	try {
		const newCard = await Card.findByIdAndUpdate(
				req.params.cardId,
				{$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
				{new: true},
		)
		await res.send(200, newCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}

module.exports.dislikeCard = async (req, res) => {
	try {
		const newCard = await Card.findByIdAndUpdate(
				req.params.cardId,
				{$pull: {likes: req.user._id}},
				{new: true},
		);
		await res.send(200, newCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}