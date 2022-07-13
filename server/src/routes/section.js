const router = require("express").Router({ mergeParams: true });
const { param } = require("express-validator");
const { verifyToken } = require("../middlewares/authToken");
const { validate, isObjectId } = require("../middlewares/validations");
const sectionController = require("../controllers/sections");

router.post(
	"/",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	sectionController.createSection
);

router.delete(
	"/:id",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid sectionID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	sectionController.deleteSection
);

router.put(
	"/:id",
	param("boardID").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid boardID");
		else return Promise.resolve();
	}),
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid sectionID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	sectionController.updateSection
);

module.exports = router;
