import { useDispatch } from "react-redux";
import { deleteContact } from "../../features/contacts/contactsSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ContactItem({ contact }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	return (
		<>
			<td>{title}.</td>
			<td>{firstName + " " + lastName + " "}</td>
			<td>{street + ", " + city + ", " + state + " " + zip}</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>{contactByMail ? <span>Yes</span> : <span>No</span>}</td>
			<td>{contactByPhone ? <span>Yes</span> : <span>No</span>}</td>
			<td>{contactByEmail ? <span>Yes</span> : <span>No</span>}</td>
			<td>
				<button
					className="edit"
					onClick={() => {
						navigate(`/edit/${contact._id}`);
					}}
				>
					<FaEdit />
				</button>
			</td>
			<td></td>
			<td>
				<button
					className="delete"
					onClick={() => {
						dispatch(deleteContact(contact._id));
					}}
				>
					<FaTrash />
				</button>
			</td>
		</>
	);
}

export default ContactItem;
