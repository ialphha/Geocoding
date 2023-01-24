import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

function Navigation() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/login");
	};
	return (
		<>
			{/* if user exist change the navigation bar. */}
			{user ? (
				<div className="nav nav-bar">
					<NavLink className={"nav-link link "} to="/addContact">
						ADD Contact
					</NavLink>
					<NavLink className="btn" onClick={onLogout}>
						Logout
					</NavLink>
				</div>
			) : (
				<div className="nav nav-bar">
					<NavLink className={"nav-link link "} to="/register">
						Register
					</NavLink>
					<NavLink className={"nav-link link "} to="/login">
						Login
					</NavLink>
				</div>
			)}
		</>
	);
}

export default Navigation;
