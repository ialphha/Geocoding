const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
	getContacts,
	getAContact,
	createContact,
	editContacts,
	deleteContact,
} = require("../controllers/contactsController");

router.get("/", protect, getContacts);
router.post("/", protect, createContact);
router.put("/:id", protect, editContacts);
router.delete("/:id", protect, deleteContact);
router.get("/:id", protect, getAContact);

module.exports = router;
