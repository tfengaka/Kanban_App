const mongoose = require("mongoose");
const { SchemaOptions } = require("./modelOption");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		icon: {
			type: String,
			default: "📃",
		},
		title: {
			type: String,
			default: "Untitled",
		},
		description: {
			type: String,
			default: `Add description here
    🟢 You can add multiline description
    🟢 Let's start...`,
		},
		position: {
			type: Number,
		},
		favourite: {
			type: Boolean,
			default: false,
		},
		favouritePosition: {
			type: Number,
			default: 0,
		},
	},
	SchemaOptions
);

module.exports = mongoose.model("boards", boardSchema);
