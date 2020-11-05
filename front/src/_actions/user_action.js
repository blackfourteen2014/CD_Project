import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';
//dataToSubmit에는 넘어온 body 데이터가 들어가 있다.;로그인 액션
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: LOGIN_USER,
        payload: request //true,false를 받는 부분
    }
}
//회원가입 액션
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: REGISTER_USER,
        payload: request //true,false를 받는 부분
    }
}