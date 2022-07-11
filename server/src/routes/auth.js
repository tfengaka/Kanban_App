const router = require("express").Router();
const { login, register } = require("../controllers/users");
const { body } = require("express-validator");
const { validate } = require("../middlewares/validations");
const { verifyToken } = require("../middlewares/authToken");
const User = require("../models/users");

router.post(
	"/signup",
	body("username")
		.isLength({ min: 4 })
		.withMessage("username must be at least 4 characters"),
	body("password")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters"),
	body("confirm")
		.isLength({ min: 8 })
		.withMessage("confirm Password must be at least 8 characters"),
	body("username").custom((value) => {
		return User.findOne({ username: value }).then((user) => {
			if (user) {
				return Promise.reject("username already used");
			}
		});
	}),
	validate,
	register
);

router.post("/signin", validate, login);

router.post("/verify-token", verifyToken, (req, res) => {
	res.status(200).json({
		user: req.user,
	});
});

module.exports = router;
