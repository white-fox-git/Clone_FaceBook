/** 로그인 페이지 입니다. ( Root 페이지입니다. ) */

import { useState } from "react";
import style from '../css/login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../component/footer";
import axios from "axios";

const Login = () => {

    axios.defaults.withCredentials = false;
    let navigate = useNavigate();

    /** 이메일 또는 전화번호를 입력받는 State */
    const [id, setId] = useState<string | number | readonly string[] | undefined>('');

    /** 비밀번호를 입력받는 State 변수*/
    const [pwd, setPwd] = useState<string | number | readonly string[] | undefined>('');

    /** Alert 창 */
    const [alert, setAlert] = useState<Boolean>(false);


    /** 입력 필드 검증 및 로그인 기능 함수 */
    const login = () => {
        if(id == '')
        {
            setAlert(true);
            setTimeout(() => setAlert(false), 3000);
        }
        else if(pwd == '')
        {
            setAlert(true);
            setTimeout(() => setAlert(false), 3000);
        }
        else
        {

            let data = {id : id, pwd};

            console.log(data);


            // 로그인 요청
            axios.post('http://localhost:9200/login', data)
            .then((res) => {
                if(res.data == true)
                    console.log('login succese');
                else
                {
                    setAlert(true);
                    setTimeout(() => setAlert(false), 3000);
                }
            })
            .catch((error) => {
                setAlert(true);
                setTimeout(() => setAlert(false), 3000);
            })
        }
    }


    return(
        <>
            <main className={style.main}>
                <div className={style.mainHeader}>
                    <h5 className={style.headerText}>facebook</h5>
                    <p>FaceBook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠보세요.</p>
                </div>
                <div className={style.login}>
                    <div className={style.loginBox}>
                        {
                            alert == true ?
                            <div className={style.AlertBox}>
                                <p>아이디 또는 비밀번호를 확인해주세요.</p>
                            </div>
                            :
                            null
                        }
                        <input type="text" placeholder="이메일 및 전화번호" className={style.input} value={id} onChange={(e) => {setId(e.target.value)}}/>
                        <input type="password" placeholder="비밀번호" className={style.input} value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                        <button className={style.loginBtn} onClick={() => {login()}}>로그인</button>
                        <Link to="/identify" className={style.forgotPwd}>비밀번호를 잊으셨나요?</Link>
                        <hr />
                        <button className={style.newId} onClick={() => navigate('/createuser')}>새 계정 만들기</button>
                    </div>
                    <p className={style.brandPage}>유명인, 브랜드 또는 비즈니스를 위한 <Link to="" className={style.brandLink}>페이지 만들기</Link></p>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Login;