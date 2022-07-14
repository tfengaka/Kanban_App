const router = require("express").Router({ mergeParams: true });
const { param } = require("express-validator");
const { verifyToken } = require("../middlewares/authToken");
const { validate, isObjectId } = require("../middlewares/validations");
const taskController = require("../controllers/tasks");

router.post(
	"/",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	taskController.createTask
);

router.put(
	"/position",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	taskController.updatePosition
);

router.put(
	"/:id",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid taskID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	taskController.updateTask
);

router.delete(
	"/:id",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid taskID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	taskController.deleteTask
);

module.exports = router;
