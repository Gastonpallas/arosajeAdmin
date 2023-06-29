import Login from "./login";
import "../index.css"
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import UserDetail from "./UserDetail";

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/userDetail/:id" element={<UserDetail />} />
            </Routes>
        </div>

    )
}
