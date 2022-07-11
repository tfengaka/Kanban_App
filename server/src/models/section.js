const mongoose = require("mongoose");
const { SchemaOptions } = require("./modelOption");
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
	{
		board: {
			type: Schema.Types.ObjectId,
			ref: "boards",
			required: true,
		},
		title: {
			type: String,
			default: "",
		},
	},
	SchemaOptions
);

module.exports = mongoose.model("sections", sectionSchema);
