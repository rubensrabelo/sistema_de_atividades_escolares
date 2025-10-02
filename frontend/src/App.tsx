import { BrowserRouter as Router, Route, Routes, Outlet, Navigate, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const PublicLayout = () => <Outlet />;

const PrivateLayout = () => {
    const token = localStorage.getItem("token");

    if (!token)
        <Navigate to="/login" replace />;

    return (
        <div>
            <Outlet />
        </div>
    );
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;