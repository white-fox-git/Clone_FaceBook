/** identify 비밀번호 찾기 페이지 */

import Footer from '../component/footer';
import style from '../css/identify.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Idenfify = () => {

    let navigate = useNavigate();

    /** 이메일 또는 전화번호를 입력받는 State */
    const [id, setId] = useState<string | number | readonly string[] | undefined>('');
    const [verificationAlert, setVerificationAlert] = useState<Boolean>(false);

    /** 입력된 ID의 유효성 검증*/
    const verification = () => {
        if(id == '')
        {
            setVerificationAlert(true); // 경고창 생성
            document.getElementById('input')?.focus(); // input 태그로 focus 이동
            setTimeout(() => {setVerificationAlert(false)}, 4000); // 4초 후 경고창을 닫는다.
        }
    }

    return (
        <>
            <header className={style.header}>
                <h4 className={style.headerLogo}>facebook</h4>
                <button onClick={() => navigate('/')}>로그인</button>
            </header>
            <main className={style.main}>
                <div className={style.formBox}>
                    <h4 className={style.formTitle}>내 계정 찾기</h4>
                    <hr />
                    {
                        verificationAlert == true ?
                        <div className={style.verificationAlertBox}>
                            <h5>필드를 하나 이상 입력하세요.</h5>
                            <p>회원님의 계정을 검색할 수 있도록 적어도 한 개의 필드를 입력하세요.</p>
                        </div>
                        :
                        null
                    }
                    <p>계정을 검색하려면 이메일 주소 또는 휴대폰 번호를 입력하세요.</p>
                    <input id="input" type="text" placeholder='이메일 또는 휴대폰 번호' className={style.input} value={id} onChange={(e) => setId(e.target.value)}/>
                    <hr />
                    <div className={style.buttonBox}>
                        <button onClick={() => navigate('/')}>취소</button>
                        <button onClick={() => verification()}>검색</button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Idenfify;