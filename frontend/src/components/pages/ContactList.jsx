import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { getContacts, reset } from "../../features/contacts/contactsSlice";
import Spinner from "./Spinner";

import { useEffect } from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts, goto }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isError, isLoading, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate, dispatch]);
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="List">
				{contacts.length > 0 ? (
					<div className="contactList">
						<table className="contactTable">
							<thead>
								<tr className="headerTr">
									<th>Title</th>
									<th>Full Name </th>
									<th> Address </th>
									<th> Email </th>
									<th> Phone </th>
									<th> Can Mail </th>
									<th> Can Phone </th>
									<th> Can Email </th>
									<th colSpan={2}>Edit/Delete Bar</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((contact, i) => (
									<tr id={i} key={i} onClick={() => goto(i)}>
										<ContactItem key={contact._id} contact={contact} />
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<h3>You have no Contacts!</h3>
				)}
			</section>
		</>
	);
}

export default ContactList;
