const mongoose = require("mongoose");
const { SchemaOptions } = require("./modelOption");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		SchemaOptions: {
			type: Schema.Types.ObjectId,
			ref: "sections",
			required: true,
		},
		title: {
			type: String,
			default: "",
		},
		content: {
			type: String,
			default: "",
		},
		position: {
			type: Number,
		},
	},
	SchemaOptions
);

module.exports = mongoose.model("tasks", taskSchema);
