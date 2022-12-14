import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtAction } from "../util/Redux/Slice/jwtSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from 'react';

const Main = () => {

    const token = useSelector((state:any) => state.jwt); // sotre에 저장된 jwt state 가져오기
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * 엑세스 토큰이 유효한지 체크하고 유효하지 않을경우 리프레시 토큰을 이용해 재발급 받는 함수
     */
    const refreshRequest = () => {
        axios.defaults.headers.common['Jwt_Access_Token'] = token.accessToken; // 헤더에 Access Token 담기
        axios.get('http://localhost:9200/check')
        .then(async (res) => {
            const result = await res.data;

            if(result == false){
                const data = await axios.post('http://localhost:9200/token', {user : token.user, token : token.refreshToken})
                .then(async (res) => {
                    if(res.data.access == true)
                   {
                        console.log(res.data);
                        axios.defaults.headers.common['Jwt_Access_Token'] = await res.data.accessToken;
                        return await {
                            user : token.user,
                            accessToken : res.data.accessToken,
                            refreshToken : res.data.refreshToken
                        }
                    }
                    else
                    {
                        navigate('/');
                        return await {
                            user : null,
                            accessToken : null,
                            refreshToken : null                            
                        }
                    }
                })
                .catch(async (error) => {
                    console.log(error);
                    navigate('/');
                    return await {
                        user : null,
                        accessToken : null,
                        refreshToken : null
                    }
                });

                dispatch(jwtAction.refresh(data));
                }
            })
            .catch((error) => {
                console.log(error);
                navigate('/');
            });
    }
    
    useEffect(() => {
        if(token.refreshToken == null)
        {
            navigate('/');
        }
        else
        {
            refreshRequest();
        }
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