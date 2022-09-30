import { Route, Routes } from "react-router-dom";
import Login from "../page/login";
import Idenfify from "../page/identify";
import CreateUser from "../page/create_user";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/identify" element={<Idenfify />} />
            <Route path="/createuser" element={<CreateUser />} />
        </Routes>
    )
}

export default App;