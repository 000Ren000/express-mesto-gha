const Card = require('../models/card');
const {sendErrorMessage} = require('../utils/utils')
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
		await res.send(201, newCard);
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
  const _id = req.params.cardId;
	try {
    if (!await Card.exists({_id})) return res.status(404).send({message:"Карточка не найдена"})
		const newCard = await Card.findByIdAndUpdate(
				_id,
				{$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
				{new: true},
		)
		await res.send(200, newCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}

module.exports.dislikeCard = async (req, res) => {
  const _id = req.params.cardId;
	try {
    if (!await Card.exists({_id})) return res.status(404).send({message:"Карточка не найдена"})
    // if (await Card.find({_id: req.params.cardId}).length)
		const newCard = await Card.findByIdAndUpdate(
				_id,
				{$pull: {likes: req.user._id}},
				{new: true}
		);
		await res.send(200, newCard);
	} catch (err) {
		sendErrorMessage(err, res)
	}
}