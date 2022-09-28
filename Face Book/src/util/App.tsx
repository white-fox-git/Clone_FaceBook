import { Route, Routes } from "react-router-dom";
import Login from "../page/login";
import Idenfify from "../page/identify";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/identify" element={<Idenfify />} />
        </Routes>
    )
}

export default App;