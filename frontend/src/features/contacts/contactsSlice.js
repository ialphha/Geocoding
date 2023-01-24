import contactService from "./contactsService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	contacts: [],
	contact: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// create goals
export const createContact = createAsyncThunk(
	"contacts/create",
	async (contact, thunkAPI) => {
		try {
			console.log("create contact called");
			const token = thunkAPI.getState().auth.user.token;
			return await contactService.createContact(contact, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get contacts:
export const getContacts = createAsyncThunk(
	"contacts/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await contactService.getContacts(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get a contact:
export const getAContact = createAsyncThunk(
	"contacts/getone",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await contactService.getAContact(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// edit contact
export const editContacts = createAsyncThunk(
	"contacts/edit",
	async ({ contact, contactId }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await contactService.editContacts(contact, contactId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);
//  delete goal:
export const deleteContact = createAsyncThunk(
	"contacts/delete",
	async (contactId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await contactService.deleteContact(contactId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const contactSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.contacts.push(action.payload);
				console.log(action.payload);
			})
			.addCase(createContact.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(getContacts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.contacts = action.payload;
			})
			.addCase(getContacts.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(getAContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.contact = action.payload;
			})
			.addCase(getAContact.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})

			.addCase(editContacts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editContacts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				//removing previous contact from the state
				state.contacts = state.contacts.filter(
					(contact) => contact._id !== action.payload._id
				);
				state.contacts.push(action.payload);
			})
			.addCase(editContacts.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(deleteContact.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				//removing previous contact from the state
				state.contacts = state.contacts.filter(
					(contact) => contact._id !== action.payload.id
				);
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
