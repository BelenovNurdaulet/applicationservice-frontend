import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User.jsx";
import Requests from "./pages/Requests.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/requests" element={<ProtectedRoute element={<Requests />} />} />
            <Route path="/user" element={<ProtectedRoute element={<User />} />} />
        </Routes>
    );
}

export default App;
