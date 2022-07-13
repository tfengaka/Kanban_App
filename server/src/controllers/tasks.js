const Section = require("../models/section");
const Task = require("../models/task");

exports.createTask = async (req, res) => {
	const { sectionID } = req.body;
	try {
		const section = await Section.findById(sectionID);
		const tasksCount = await Task.find({ section: sectionID }).count();
		const task = await Task.create({
			section: sectionID,
			position: tasksCount > 0 ? tasksCount : 0,
		});
		task._doc.section = section;
		res.status(201).json(task);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

exports.updateTask = async (req, res) => {
	const { id } = req.params;
	try {
		const task = await Task.findByIdAndUpdate(id, {
			$set: req.body,
		});
		res.status(200).json(task);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

exports.deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		const currentTask = await Task.findById(id);
		await Task.deleteOne({ _id: id });
		const tasks = await Task.find({ section: currentTask.section }).sort(
			"position"
		);
		for (const key in tasks) {
			await Task.findByIdAndUpdate(tasks[key].id, { $set: { position: key } });
		}
		res.status(200).json("OK");
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};

exports.updatePosition = async (req, res) => {
	const { sourceList, destinationList, sourceSectionID, destinationID } =
		req.body;
	const sourceListReverse = sourceList.reverse();
	const destinationListReverse = destinationList.reverse();

	try {
		if (sourceSectionID !== destinationID) {
			for (const key in sourceListReverse) {
				await Task.findByIdAndUpdate(sourceListReverse[key].id, {
					$set: {
						section: sourceSectionID,
						position: key,
					},
				});
			}
		}
		for (const key in destinationListReverse) {
			await Task.findByIdAndUpdate(destinationListReverse[key].id, {
				$set: {
					section: destinationID,
					position: key,
				},
			});
		}
		res.status(200).json("OK");
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
