import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtAction } from "../util/Redux/Slice/jwtSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import style from '../css/main.module.css';
import { useCallback, useEffect } from 'react';

const Main = () => {

    const token = useSelector((state:any) => state.jwt); // sotre에 저장된 jwt state 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * 엑세스 토큰이 유효한지 체크하고 유효하지 않을경우 리프레시 토큰을 이용해 재발급 받는 함수
     */

    const checkAccessToken = useCallback( async () => {
        axios.defaults.headers.common['Jwt_Access_Token'] = token.accessToken;
        let result:{data : boolean} = await axios.get('http://localhost:9200/check');

        console.log(result);

        if(result.data == false)
            refreshRequest();
    }, [token]);

    /**
     * 리프레시 토큰이 유효한 토큰인지 확인하고 유효하다면 엑세스 토큰을 재발급 해주는 함수
     */
    const refreshRequest = async () => {
        const res:{data : {access:Boolean, accessToken:string, refreshToken:string }} = await axios.post('http://localhost:9200/token', {user : token.user, token : token.refreshToken});

        if(res?.data?.access == true)
        {
            axios.defaults.headers.common['Jwt_Access_Token'] = res.data.accessToken;
            dispatch(jwtAction.refresh({
                user : token.user,
                accessToken : res.data.accessToken,
                refreshToken : res.data.refreshToken
            }));
        }
        else
        {
            dispatch(jwtAction.deleteToken());
            navigate('/');
        }
    }
    
    useEffect(() => {
        if(token.refreshToken == null)
        {
            navigate('/');
        }
        else
        {
            checkAccessToken();
        }
    }, []);


    return(
        <>
            <header className={style.header}>
                <img src='/public/icon.png' className={style.logo}/>
                <input type="text" placeholder='검색' />
            </header>
            <button onClick={() => {
                dispatch(jwtAction.deleteToken());
                navigate('/');
                }}>로그아웃</button>
        </>
    )
}

export default Main;