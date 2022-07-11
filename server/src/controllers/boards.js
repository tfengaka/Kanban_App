const Board = require("../models/board");
const Section = require("../models/section");
const Task = require("../models/task");

exports.createBoard = async (req, res) => {
	try {
		const boardCount = await Board.find().count();
		const board = await Board.create({
			owner: req.user._id,
			position: boardCount > 0 ? boardCount : 0,
		});
		res.status(201).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getAllBoards = async (req, res) => {
	try {
		const boards = await Board.find({ owner: req.user._id }).sort("-position");
		res.status(200).json(boards);
	} catch (error) {
		res.status(500).json(error);
	}
};
exports.updatePosition = async (req, res) => {
	const { boards } = req.body;
	try {
		for (const key in boards.reverse()) {
			const board = boards[key];
			await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
		}
		res.status(200).json("OK");
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
};
