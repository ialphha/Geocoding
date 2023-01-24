import React from "react";
import { FaUser } from "react-icons/fa";

function EditForm(props) {
	const {
		formData,
		setFormData,
		contactByEmail,
		contactByMail,
		contactByPhone,
		setContactByEmail,
		setContactByMail,
		setContactByPhone,
		onChange,
		redirect,
		onSubmit,
	} = props;

	const { firstName, lastName, email, phone, title, street, city, state, zip } =
		formData;
	return (
		<>
			<section className="heading">
				<h1>
					<FaUser />
				</h1>
				<p>Record your contacts here:</p>
			</section>
			<section className="form">
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							value={firstName}
							placeholder="Enter First Name"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							value={lastName}
							placeholder="Enter Last Name"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter email"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="tel"
							className="form-control"
							id="phone"
							name="phone"
							value={phone}
							placeholder="Enter Phone number"
							onChange={onChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="title"> Title:</label>
						<div className="radio">
							<label>
								<input
									type="radio"
									value="Mr"
									name="title"
									className="form-control"
									checked={title === "Mr"}
									onChange={onChange}
								/>
								Mr.
							</label>

							<label>
								<input
									type="radio"
									value="Mrs"
									name="title"
									className="form-control"
									checked={title === "Mrs"}
									onChange={onChange}
								/>
								Mrs.
							</label>

							<label>
								<input
									type="radio"
									value="Ms"
									name="title"
									className="form-control"
									checked={title === "Ms"}
									onChange={onChange}
								/>
								Ms.
							</label>

							<label>
								<input
									type="radio"
									value="Dr"
									name="title"
									className="form-control"
									checked={title === "Dr"}
									onChange={onChange}
								/>
								Dr.
							</label>
						</div>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="street"
							name="street"
							value={street}
							placeholder="Enter street"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="city"
							name="city"
							value={city}
							placeholder="Enter City"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="state"
							name="state"
							value={state}
							placeholder="Enter State"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="zip"
							name="zip"
							value={zip}
							placeholder="Enter Zip"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<legend>Choose your choice of communication:</legend>

						<input
							type="checkbox"
							id="contactByMail"
							name="contactByMail"
							value={contactByMail}
							onChange={() => {
								setContactByMail(!contactByMail);
							}}
							checked={contactByMail}
						/>
						<label for="contactByMail">By Mail</label>

						<input
							type="checkbox"
							id="contactByPhone"
							name="contactByPhone"
							value={contactByPhone}
							onChange={() => {
								setContactByPhone(!contactByPhone);
							}}
							checked={contactByPhone}
						/>
						<label for="contactByPhone">By Phone</label>

						<input
							type="checkbox"
							id="contactByEmail"
							name="contactByEmail"
							value={contactByEmail}
							onChange={() => {
								setContactByEmail(!contactByEmail);
							}}
							checked={contactByEmail}
						/>
						<label for="contactByEmail">By Email</label>
					</div>
					<div className="form-group">
						<button id="submitButton" type="submit">
							Submit
						</button>
						<button id="cancelButton" onClick={redirect}>
							Cancel
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default EditForm;
