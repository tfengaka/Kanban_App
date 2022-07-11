const router = require("express").Router();
const { param } = require("express-validator");
const { verifyToken } = require("../middlewares/authToken");
const { validate, isObjectId } = require("../middlewares/validations");
const boardController = require("../controllers/boards");

router.post("/", verifyToken, boardController.createBoard);
router.get("/", verifyToken, boardController.getAllBoards);
router.put("/", verifyToken, boardController.updatePosition);
router.get(
	"/:id",
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid Id");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	boardController.getBoardDetail
);
router.put(
	"/:id",
	param("id").custom((value) => {
		if (!isObjectId(value)) return Promise.reject("Invalid Id");
		else return Promise.resolve();
	}),
	validate,
	verifyToken,
	boardController.updateBoardData
);

module.exports = router;
