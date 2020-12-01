import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import LogoImage from '../LoginPage/LoginImage/simile.png'
import { Image, Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';
//예전버전에서는 state를 가져오기 힘들기에 class를 사용했지만
//16.8버전 이후로는 funtion에서도 state를 가져올 수 있음 (useState 사용)
//더 자세한 건 https://ko.reactjs.org/docs/hooks-intro.html

function LoginPage(props) {
    const dispatch = useDispatch(); //redux
    //state 초기화
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")
    //state 설정
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = () => {
        //event.preventDefault(); //기본 기능 차단
        //console.log('Email',Email); //이메일
        //console.log('passwd',Password); //비번
        //console.log('submit'); //버튼을 눌렀을 때
        let body = {
            Id,
            password: Password
        }
        //.than는 앞의 함수가 다 처리될 때까지 기다린 뒤에 than안에 있는 명령어를 실행한다.
        // dispatch 함수에는 액션을 파라미터로 전달
        dispatch(loginUser(body))//데이터를 body에 담아서 action으로 보냄
            .then(response => { //앞의 함수가 처리되고 응답(response)한 데이터가 들어가있다.
                //console.log(response.payload);
                if(response.payload.loginSuccess){ //응답한 payload에 있는 loginSuccess의 true,false값을 확인
                   if(response.payload.grant === 'system'){
                        props.history.push('/holiday')
                   }else if(response.payload.grant === 'employee'){
                        props.history.push('/main'); //로그인에 성공하면 메인페이지로
                   }else if(response.payload.grant === 'president'){
                        props.history.push('/prezmain')
                   }
                }
                else {
                    alert(response.payload.message);
                }
            })
    }
    //폼 레이아웃
    const Formlayout = {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 20,
        },
      };
    return (
        <div style={{width: '380px', margin: '0 auto'}}>
            <div style = {{display: 'block', margin: 'auto', marginTop: '50%', marginBottom: '10%',width: '380px', height: '75px', borderBottom: 'grey solid 1px', backgroundColor: 'white'}}>
                <Image src={LogoImage} width={380} height={70} />
            </div>
            <Form
                {...Formlayout}
                name="loginUser"
                onFinish={onSubmitHandler}
                style = {{display: 'flex', flexDirection: 'column'}}
                >
                <Form.Item label="사원번호" name="Id">
                    <Input value={Id} onChange={onIdHandler} />
                </Form.Item>
                <Form.Item label="비밀번호" name="Password">
                    <Input.Password value={Password} onChange={onPasswordHandler} />
                </Form.Item>
                <Button htmlType="submit">Login </Button>
            </Form>
        </div>
    )
}

export default LoginPage

