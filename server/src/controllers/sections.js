const Section = require("../models/section");
const Task = require("../models/task");

exports.createSection = async (req, res) => {
	const { boardID } = req.params;
	try {
		const section = await Section.create({ board: boardID });
		section._doc.tasks = [];
		res.status(201).json(section);
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.updateSection = async (req, res) => {
	const { id } = req.params;
	try {
		const section = await Section.findByIdAndUpdate(id, {
			$set: req.body,
		});
		section._doc.task = [];
		res.status(201).json(section);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

exports.deleteSection = async (req, res) => {
	const { id } = req.params;

	try {
		await Task.deleteMany({ section: id });
		await Section.deleteOne({ _id: id });
		res.status(200).json("OK");
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
