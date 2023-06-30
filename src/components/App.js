import Login from "./login";
import "../index.css"
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import UserDetail from "./UserDetail";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications-component/dist/theme.css';

function App() {
    return (
        <div>
            <NotificationContainer />
            <Routes>
                <Route path="" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/userDetail/:id" element={<UserDetail />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>

    )


    function NoMatch() {
        return (<div>Not Found</div>);
    }

}

export default App
