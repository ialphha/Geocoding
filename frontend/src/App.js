import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigation from "./components/Navigation";
import InformationForm from "./components/forms/InformationForm";

import EditContact from "./pages/EditContact";

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<BrowserRouter>
				<Navigation />
				<Routes>
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/addContact" element={<InformationForm />} />
					<Route exact path="/edit/:id" element={<EditContact />} />
					<Route exact path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
