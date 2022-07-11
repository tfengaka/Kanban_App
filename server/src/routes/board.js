const router = require("express").Router();
const { verifyToken } = require("../middlewares/authToken");
const {
	createBoard,
	getAllBoards,
	updatePosition,
} = require("../controllers/boards");

router.post("/", verifyToken, createBoard);
router.get("/", verifyToken, getAllBoards);
router.put("/", verifyToken, updatePosition);

module.exports = router;
