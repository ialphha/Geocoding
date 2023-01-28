import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContactList from "../components/pages/ContactList";
import Geolocation from "../components/pages/Geolocation";
import Spinner from "../components/pages/Spinner";
import { getContacts, reset } from "../features/contacts/contactsSlice";

function Dashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { contacts, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.contacts
	);
	const [itemNumber, setItemNumber] = useState(0);

	const goto = (i) => {
		setItemNumber(i);
	};
	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}
		dispatch(getContacts());

		// returns after the component "Unmounts"
		return () => {
			dispatch(reset());
		};
	}, [user, navigate, dispatch, itemNumber]);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<div className="heading">
				<h3>Your Contacts:</h3>
			</div>
			<div className="container">
				{/* have to pass the contact info after getting it from backend */}
				<ContactList contacts={contacts} goto={goto} />
				<Geolocation contacts={contacts} itemNumber={itemNumber} />
			</div>
		</>
	);
}

export default Dashboard;
