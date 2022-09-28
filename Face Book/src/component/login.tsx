import { useState } from "react";
import style from '../css/login.module.css';
import { Link } from 'react-router-dom';

const Login = () => {

    const [id, setId] = useState<string | number | readonly string[] | undefined>('');
    const [pwd, setPwd] = useState<string | number | readonly string[] | undefined>('');

    return(
        <>
            <main className={style.main}>
                <div className={style.mainHeader}>
                    <h5 className={style.headerText}>facebook</h5>
                    <p>FaceBook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를 나눠보세요.</p>
                </div>
                <div className={style.login}>
                    <div className={style.loginBox}>
                        <input type="text" placeholder="이메일 및 전화번호" className={style.input} value={id} onChange={(e) => {setId(e.target.value)}}/>
                        <input type="password" placeholder="비밀번호" className={style.input} value={pwd} onChange={(e) => {setPwd(e.target.value)}}/>
                        <button className={style.loginBtn}>로그인</button>
                        <Link to="" className={style.forgotPwd}>비밀번호를 잊으셨나요?</Link>
                        <hr />
                        <button className={style.newId}>새 계정 만들기</button>
                    </div>
                    <p className={style.brandPage}>유명인, 브랜드 또는 비즈니스를 위한 <Link to="" className={style.brandLink}>페이지 만들기</Link></p>
                </div>
            </main>
            <footer className={style.footer}>
                <p>Develope by White-Fox</p>
                <a target="blank" href="https://github.com/white-fox-git" className={style.a}>Git Hub</a>
            </footer>
        </>
    )
}

export default Login;