import { useNavigate, Link } from "react-router-dom"
import style from '../css/create_user.module.css';
import axios from 'axios';
import Footer from "../component/footer";
import { useState } from "react";

const CreateUser = () => {

    let navigate = useNavigate();

    /** 입력 필드 */
    const [firstName, setFirstName] = useState<string | number | readonly string[] | undefined>('');
    const [lastName, setLastName] = useState<string | number | readonly string[] | undefined>('');
    const [id, setId] = useState<string | number | readonly string[] | undefined>('');
    const [pwd, setPwd] = useState<string | number | readonly string[] | undefined>('');
    const [checkPwd, setCheckPwd] = useState<string | number | readonly string[] | undefined>('');


    const [alertText, setAlertText] = useState<string>('');
    const [alert, setAlert] = useState<Boolean>(false);
    const [modal, setModal] = useState<Boolean>(false);

    /** Alert창을 띄우고 안에 들어갈 값을 매개변수로 받는다. */
    const onAlert = (text:string, item:string) => {
        setAlertText(text);
        setAlert(true);
        setTimeout(() => {setAlert(false)}, 3000);
        document.getElementById(item)?.focus();
    }

    /** 회원가입 요청 함수 */
    const create = () => {
        let data = {
            firstName : firstName, 
            lastName : lastName,
            id : id,
            pwd : pwd
        }

        if(firstName == ''){
            onAlert('성을 입력해주세요.', 'firstName');
        }
        else if(lastName == '')
        {
            onAlert('이름을 입력해주세요.', 'lastName');
        }
        else if(id == '')
        {
            onAlert('이메일 또는 전화번호를 입력해주세요.', 'id');
        }
        else if(pwd == '')
        {
            onAlert('비밀번호를 확인해주세요.', 'pwd');
        }
        else if(pwd != checkPwd)
        {
            onAlert('비밀번호가 다릅니다.', 'chkPwd');
            setCheckPwd('');
        }
        else
        {
            axios.post('http://localhost:9200/createuser', data)
            .then((res) => {
                setModal(true);
            })
            .catch((error) => {
                onAlert('서버와의 연결에 실패했습니다.', 'chkPwd');
                console.log(error);
            });  
        }          
    }

    return(
        <>
            <main className={style.main}>
                <h5 className={style.headerText}>facebook</h5>
                <div className={style.formBox}>
                    <h5>새 계정 만들기</h5>
                    <hr />
                    {
                        alert == true ?
                        <div className={style.AlertBox}>
                            <p>{alertText}</p>
                        </div>
                        :
                        null
                    }
                    <div className={style.nameBox}>
                        <input type="text" id='firstName' className={style.nameInput} placeholder="성" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <input id='lastName' className={style.nameInput} placeholder="이름" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <input type="text" id='id' className={style.longInput} placeholder="이메일 또는 전화번호" value={id} onChange={(e) => setId(e.target.value)}/>
                    <input type="password" id='pwd'  className={style.longInput} placeholder="비밀번호" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
                    <input type="password" id='chkPwd' className={style.longInput} placeholder="비밀번호 확인" value={checkPwd} onChange={(e) => setCheckPwd(e.target.value)}/>
                    <button onClick={() => create()}>가입하기</button>
                    <Link to="/" className={style.link}>이미 계정이 있으신가요?</Link>
                </div>
            </main>
            <Footer />
            {
                modal == true ?
                <div className={style.modal}>
                    <div className={style.modalBox}>
                        <h5>알림</h5>
                        <hr />
                        <p>회원가입이 완료되었습니다.</p>
                        <button onClick={() => navigate('/')}>확인</button>
                    </div>
                </div>
                :
                null
            }
        </>
    )
}

export default CreateUser