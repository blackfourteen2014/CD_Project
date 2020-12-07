import axios from 'axios';
import {
    LOGIN_USER,
    CREATE_USER,
    UPDATE_USER,
    ONWORK_USER,
    OFFWORK_USER,
    HOLIDAY_USER,
    MYPAGE_USER
} from './types';
//dataToSubmit에는 넘어온 body 데이터가 들어가 있다.;로그인 액션
export function loginUser(dataToSubmit){
    const request = axios.post('/api/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request //true,false를 받는 부분
    }
}
//직원 추가 액션
export function createUser(dataToSubmit){
    const request = axios.post('/api/system/create', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: CREATE_USER,
        payload: request //true,false를 받는 부분
    }
}
// 직원 수정 액션
export function updateUser(dataToSubmit){
    const request = axios.post('/api/system/update', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: UPDATE_USER,
        payload: request //true,false를 받는 부분
    }
}
//출근 버튼 액션
export function OnWorkUser(dataToSubmit){
    const request = axios.post('/api/users/onwork', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: ONWORK_USER,
        payload: request //true,false를 받는 부분
    }
}
//퇴근 버튼 액션
export function OffWorkUser(dataToSubmit){
    const request = axios.post('/api/users/offwork', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: OFFWORK_USER,
        payload: request //true,false를 받는 부분
    }
}
//연가 유저 데이터 Create
export function HolidayUserCreate(dataToSubmit){
    const request = axios.post('/api/users/holidayusercreate', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: HOLIDAY_USER,
        payload: request //true,false를 받는 부분
    }
}
//마이페이지 PasswordCheck
export function MyPagePasswordCheck(dataToSubmit){
    const request = axios.post('/api/users/mypagepasswordcheck', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: MYPAGE_USER,
        payload: request //true,false를 받는 부분
    }
}
