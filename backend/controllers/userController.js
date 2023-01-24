const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//@description : Register User
//@route       : POST api/users
//@access      : Public
const registerUser = asyncHandler(async (req, res) => {
	console.log("register called");
	const { firstname, lastname, email, password, phone } = req.body;

	if (!firstname || !lastname || !email || !password || !phone) {
		res.status(400);
		throw new Error("Please add all the required fields");
	}

	//check if userexists:
	// const userExists = await User.findOne({
	// 	$or: [{ email: email }, { phone: phone }],
	// });
	const userExists = await User.findOne({ email });
	console.log("userExists:", userExists);

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}
	//hash the password:
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user:
	const user = await User.create({
		firstname,
		lastname,
		email,
		password: hashedPassword,
		phone,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

//@description : Login User
//@route       : POST api/users/login
//@access      : Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			phone: user.phone,
			token: generateToken(user._id),
		});
	}
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

module.exports = { registerUser, loginUser };
