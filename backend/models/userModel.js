const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		phone: {
			type: Number,
			required: [true, "Please add phone number"],
		},
		firstname: {
			type: String,
			required: [true, "Please add phone number"],
		},
		lastname: {
			type: String,
			required: [true, "Please add phone number"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
