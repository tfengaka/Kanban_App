const jwt = require("jsonwebtoken");
const User = require("../models/users");

const tokenDecode = (req) => {
	const beartoken = req.headers["authorization"];

	if (beartoken) {
		const token = beartoken.split(" ")[1];
		try {
			const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
			return tokenDecoded;
		} catch (err) {
			return false;
		}
	} else return false;
};

exports.verifyToken = async (req, res, next) => {
	const tokenken = tokenDecode(req);
	if (tokenken) {
		const user = await User.findById(tokenken.id);
		if (!user) {
			return res.status(401).json({
				message: "Unauthorized!",
			});
		}
		req.user = user;
		next();
	} else {
		console.log("token not found");
		return res.status(401).json({
			message: "Unauthorized!",
		});
	}
};
