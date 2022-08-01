const Card = require('../models/card');

//Методы работы с карточками

// GET /cards — возвращает все карточки
module.exports.getCardAll = async (req, res) => {
	try {
		const  allCard = await Card.find({});
		await res.send(200, allCard);
	} catch (err) {
		res.status(500).json({message: 'Не получилось получить данные карточек'})
	}
}

// POST /cards — создаёт карточку
module.exports.createCard = async (req, res) => {
	try {
		const {name, link} = req.body;
		const newCard = await Card.create({name, link});
		await res.send(200, newCard);
	} catch (err) {
		res.status(500).json({message: 'Не получилось cоздать карточку'})
	}
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = async (req, res) => {
try {

}catch (err) {res.status(500).json({message:'Не получилось удалить карточку'})}
}