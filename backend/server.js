const express = require("express");

const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");

const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// this will call the bodyparser by default so no need to call
// If you use express.json() it will parse the body from
// post/fetch request except from html post form. It wont parse information from the html post form :
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// for sign up, login
app.use("/api/users", require("./routes/userRoutes"));

// for adding the contact, crud of contact list
app.use("/api/mailer", require("./routes/contactsRoutes"));
app.listen(port, () => `server started on port: ${port}`);
