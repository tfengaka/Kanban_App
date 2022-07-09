const User = require("../models/users");
const CrytoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	const { password } = req.body;

	try {
		req.body.password = CrytoJS.AES.encrypt(
			password,
			process.env.PASSWORD_SECRET
		).toString();
		const user = await User.create(req.body);
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});
		res.status(201).json({
			user,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Error encrypting password",
		});
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username }).select("password username");
		if (!user) {
			return res.status(401).json({
				errors: [
					{
						param: "username",
						msg: "Incorrect username",
					},
				],
			});
		}
		const decryptedPassword = CrytoJS.AES.decrypt(
			user.password,
			process.env.PASSWORD_SECRET
		).toString(CrytoJS.enc.Utf8);

		if (decryptedPassword !== password) {
			return res.status(401).json({
				errors: [
					{
						param: "password",
						msg: "Incorrect password",
					},
				],
			});
		}
		user.password = undefined;
		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});
		res.status(200).json({
			user,
			token,
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};
