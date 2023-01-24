import axios from "axios";

const API_URL = "/api/mailer/";

const createContact = async (contact, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, contact, config);
	return response.data;
};

const getContacts = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL, config);
	return response.data;
};

const getAContact = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL + id, config);
	return response.data;
};

const editContacts = async (contact, contactId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + contactId, contact, config);

	return response.data;
};

const deleteContact = async (contactId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + contactId, config);
	return response.data;
};

const contactService = {
	createContact,
	getContacts,
	getAContact,
	editContacts,
	deleteContact,
};

export default contactService;
