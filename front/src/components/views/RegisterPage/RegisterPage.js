import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch(); //redux
    //state 초기화(useState 명령어로 간편하게!)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    //state 설정; 이메일
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    //이름
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    //패스워드
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    //패스워드 확인
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    //submit 버튼
    const onSubmitHandler = (event) => {
        event.preventDefault(); //기본 기능 차단
        //비밀번호 확인
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }
        
        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        //LoginPage.js에 자세한 설명 기입
        dispatch(registerUser(body))
            .then(response => { 
                if(response.payload.registerSuccess){ 
                    props.history.push('/login')
                }
                else {
                    alert('Failed to sign up...');
                }
            }) 
        }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    회원 가입
                </button>
            </form>        
        </div>
    )
}
export default RegisterPage
