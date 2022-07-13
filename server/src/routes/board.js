const router = require("express").Router();
const { param } = require("express-validator");
const { verifyToken } = require("../middlewares/authToken");
const { validate, isObjectId } = require("../middlewares/validations");
const boardController = require("../controllers/boards");

router.get("/", verifyToken, boardController.getAllBoards);

router.post("/", verifyToken, boardController.createBoard);

router.put("/", verifyToken, boardController.updatePosition);

router.get("/favorites", verifyToken, boardController.getFavoriteBoards);

router.put("/favorites", verifyToken, boardController.updateFavoritesPosition);

router.get(
	"/:id",
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid ID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	boardController.getBoardDetail
);

router.put(
	"/:id",
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid ID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	boardController.updateBoardData
);

router.delete(
	"/:id",
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid ID");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	boardController.deleteBoard
);

module.exports = router;
