import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtAction } from "../util/Redux/Slice/jwtSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from 'react';

const Main = () => {

    const token = useSelector((state:any) => state.jwt);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        token.refreshToken == null ? navigate('/') : dispatch(jwtAction.refresh({token : token.refreshToken}));

        axios.get('http://localhost:9200/check')
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    },[])


    return(
        <>
            <button onClick={() => {
                dispatch(jwtAction.deleteToken());
                navigate('/');
                }}>로그아웃</button>
        </>
    )
}

export default Main;