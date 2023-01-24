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
	const { contacts, isError, isLoading, message } = useSelector(
		(state) => state.contacts
	);

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
	}, [user, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<div>Dashboard</div>
			{/* have to pass the contact info after getting it from backend */}
			<ContactList contacts={contacts} />
			<Geolocation />
		</>
	);
}

export default Dashboard;
