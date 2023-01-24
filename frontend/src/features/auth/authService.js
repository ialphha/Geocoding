import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		window.localStorage.setitem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(API_URL + "login", userData);

	if (response.data) {
		window.localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const logout = () => {
	window.localStorage.removeItem("user");
};

const authService = {
	register,
	login,
	logout,
};

export default authService;
