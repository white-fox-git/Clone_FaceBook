import { Route, Routes } from "react-router-dom";
import Login from "../component/login";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />}/>
        </Routes>
    )
}

export default App;