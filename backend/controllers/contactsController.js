const asyncHandler = require("express-async-handler");

const Contacts = require("../models/contactsModel");

//@description : Get Contacts
//@route       : GET api/contacts
//@access      : Private
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contacts.find({ user: req.user.id });
	res.status(200).json(contacts);
});

const getAContact = asyncHandler(async (req, res) => {
	const contact = await Contacts.findOne({ _id: req.params.id });
	res.status(200).json(contact);
});

//@description : Get Contacts
//@route       : POST api/contacts
//@access      : Private
const createContact = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		title,
		street,
		city,
		state,
		zip,
		contactByMail,
		contactByPhone,
		contactByEmail,
	} = req.body;
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!title ||
		!street ||
		!city ||
		!state ||
		!zip
	) {
		res.status(400);
		throw new Error("Please add all the required fields");
	}
	const contactExists = await Contacts.findOne({
		$or: [{ email: email }, { phone: phone }],
	});
	if (contactExists) {
		res.status(400);
		throw new Error("contacts already exists!");
	}
	const contact = await Contacts.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
		phone: phone,
		title: title,
		street: street,
		city: city,
		state: state,
		zip: zip,
		contactByMail: contactByMail,
		contactByPhone: contactByPhone,
		contactByEmail: contactByEmail,
		user: req.user.id,
	});

	res.status(200).json(contact);
});

//@description : edit contacts
//@route       : PUT api/contacts/:id
//@access      : Private
const editContacts = asyncHandler(async (req, res) => {
	//finding the contact requested in the req.id via url params
	const contact = await Contacts.findById(req.params.id);
	console.log("{edit contact called");
	if (!contact) {
		res.status(400);
		throw new Error("contact not found!");
	}

	// check if the user exist:
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	//check if the contacts already exists or not
	const contactExists = await Contacts.findOne({
		$or: [{ email: email }, { phone: phone }],
	});
	if (contactExists) {
		res.status(400);
		throw new Error("contacts already exists!");
	}
	// check if the req.user and user in the db is the same
	if (contact.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized!");
	}

	const updateContact = await Contacts.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	// console.log("updated ->", updateContact);
	res.status(200).json(updateContact);
});

//@description : delete the contact
//@route       : DELETE api/contacts/:id
//@access      : Private
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contacts.findById(req.params.id);
	if (!contact) {
		res.status(400);
		throw new Error("The contact does not exists!");
	}

	// check if the user exist:
	if (!req.user) {
		res.status(401);
		throw new Error("User not found");
	}

	// check if the req.user and user in the db is the same
	if (contact.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized!");
	}

	await contact.remove();
	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getContacts,
	getAContact,
	createContact,
	editContacts,
	deleteContact,
};
