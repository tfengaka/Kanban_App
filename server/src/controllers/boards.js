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

exports.getBoardDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const board = await Board.findOne({ owner: req.user._id, _id: id });
		if (!board) return res.status(404).json({ message: "Board not found" });
		const sections = await Section.find({ board: board._id });
		for (const section of sections) {
			const tasks = await Task.find({ section: section._id })
				.populate("section")
				.sort("-position");
			section._doc.tasks = tasks;
		}
		board._doc.sections = sections;
		res.status(200).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updateBoardData = async (req, res) => {
	const { id } = req.params;
	const { title, description, favourite } = req.body;
	try {
		if (title === "") req.body.title = "Untitled";
		if (description === "") req.body.description = "Add description here";
		const currentBoard = await Board.findById(id);
		if (!currentBoard)
			return res.status(404).json({ message: "Board not found" });

		if (favourite !== undefined && currentBoard.favourite !== favourite) {
			const favourites = await Board.find({
				owner: currentBoard.owner,
				favourite: true,
				_id: { $ne: id },
			});
			if (favourite) {
				req.body.favouritePosition = favourites.length > 0 ? favouriteCount : 0;
			} else {
				for (const key in favourites) {
					const ele = favourites[key];
					await Board.findByIdAndUpdate(ele._id, {
						$set: { favouritePosition: key },
					});
				}
			}
		}

		const board = await Board.findByIdAndUpdate(id, { $set: req.body });
		res.status(200).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};
