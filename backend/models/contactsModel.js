const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		firstName: {
			type: String,
			required: [true, "Please add first name"],
		},
		lastName: {
			type: String,
			required: [true, "Please add last name"],
		},
		email: {
			type: String,
			required: [true, "Please add email"],
			unique: true,
		},
		phone: {
			type: Number,
			required: [true, "Please add phone number"],
			unique: true,
		},
		title: {
			type: String,
			required: [true, "Please add Title"],
		},
		street: {
			type: String,
			required: [true, "Please add Street"],
		},
		city: {
			type: String,
			required: [true, " Please add City"],
		},
		state: {
			type: String,
			required: [true, " Please add State"],
		},
		zip: {
			type: String,
			required: [true, " Please add Zip"],
		},
		contactByMail: {
			type: Boolean,
		},
		contactByPhone: {
			type: Boolean,
		},
		contactByEmail: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Contacts", contactSchema);
