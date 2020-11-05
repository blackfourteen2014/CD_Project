import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

//예전버전에서는 state를 가져오기 힘들기에 class를 사용했지만
//16.8버전 이후로는 funtion에서도 state를 가져올 수 있음 (useState 사용)
//더 자세한 건 https://ko.reactjs.org/docs/hooks-intro.html
function LoginPage(props) {
    const dispatch = useDispatch(); //redux
    //state 초기화
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    //state 설정
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //기본 기능 차단
        //console.log('Email',Email);
        //console.log('passwd',Password);
        
        let body = {
            email: Email,
            password: Password
        }
        //.than는 앞의 함수가 다 처리될 때까지 기다린 뒤에 than안에 있는 명령어를 실행한다.
        // dispatch 함수에는 액션을 파라미터로 전달
        dispatch(loginUser(body))//데이터를 body에 담아서 action으로 보냄
            .then(response => { //앞의 함수가 처리되고 응답(response)한 데이터가 들어가있다.
                if(response.payload.loginSuccess){ //응답한 payload에 있는 loginSuccess의 true,false값을 확인
                    props.history.push('/') //로그인에 성공하면 시작페이지로 돌아옴
                }
                else {
                    alert('Error');
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>        
        </div>
    )
}

export default LoginPage
