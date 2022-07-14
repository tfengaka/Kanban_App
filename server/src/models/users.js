const mongoose = require("mongoose");

const { SchemaOptions } = require("./modelOption");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
	},
	SchemaOptions
);

module.exports = mongoose.model("users", userSchema);
