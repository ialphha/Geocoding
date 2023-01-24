import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
	editContacts,
	getAContact,
	reset,
} from "../features/contacts/contactsSlice";
import EditForm from "../components/forms/EditForm";
import Spinner from "../components/pages/Spinner";

function EditContact() {
	let params = useParams();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	//get the specific contact to edit
	const { isError, isSuccess, isLoading, message, contact } = useSelector(
		(state) => state.contacts
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}

		dispatch(getAContact(params.id));
		if (isSuccess) {
			loadContactInfo();
		}
		// returns after the component "Unmounts"
		// return () => {
		// 	//loadContactInfo();
		// 	dispatch(reset());
		// };
	}, [user, isSuccess, navigate]);

	const [contactByMail, setContactByMail] = useState(false);
	const [contactByEmail, setContactByEmail] = useState(false);
	const [contactByPhone, setContactByPhone] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		title: "Mr",
		street: "",
		city: "",
		state: "",
		zip: "",
	});
	const { firstName, lastName, email, phone, title, street, city, state, zip } =
		formData;
	const loadContactInfo = () => {
		//set the values in the state of this component
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
		} = contact;

		setFormData({
			firstName,
			lastName,
			email,
			phone,
			title,
			street,
			city,
			state,
			zip,
		});
		setContactByEmail(contactByEmail);
		setContactByMail(contactByMail);
		setContactByPhone(contactByPhone);
	};
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const redirect = () => {
		navigate("/");
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (!user) {
			toast.error("Login first");
			console.log("no user logged in");
		} else {
			const userData = {
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
			};
			dispatch(editContacts({ contact: userData, contactId: params.id }));
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				title: "Mr",
				street: "",
				city: "",
				state: "",
				zip: "",
			});
			setContactByEmail(false);
			setContactByPhone(false);
			setContactByMail(false);
		}
	};
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<EditForm
				formData={formData}
				setFormData={setFormData}
				contactByEmail={contactByEmail}
				contactByMail={contactByMail}
				contactByPhone={contactByPhone}
				setContactByEmail={setContactByEmail}
				setContactByMail={setContactByMail}
				setContactByPhone={setContactByPhone}
				onChange={onChange}
				redirect={redirect}
				onSubmit={onSubmit}
			/>
		</>
	);
}

export default EditContact;
