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
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request //true,false를 받는 부분
    }
}
//직원 추가 액션
export function createUser(dataToSubmit){
    const request = axios.post('/api/users/create', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: CREATE_USER,
        payload: request //true,false를 받는 부분
    }
}
// 직원 수정 액션
export function updateUser(dataToSubmit){
    const request = axios.post('/api/users/update', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: UPDATE_USER,
        payload: request //true,false를 받는 부분
    }
}
//출근 버튼 액션
export function onWorkUser(dataToSubmit){
    const request = axios.post('/api/onWork', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: ONWORK_USER,
        payload: request //true,false를 받는 부분
    }
}
//퇴근 버튼 액션
export function offWorkUser(dataToSubmit){
    const request = axios.post('/api/offWork', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: OFFWORK_USER,
        payload: request //true,false를 받는 부분
    }
}
//연가 액션
export function HolidayUser(dataToSubmit){
    const request = axios.post('/api/holidayuserinsert', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: HOLIDAY_USER,
        payload: request //true,false를 받는 부분
    }
}
//마이페이지 체크
export function myPageUser(dataToSubmit){
    const request = axios.post('/api/mypagecheck', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: MYPAGE_USER,
        payload: request //true,false를 받는 부분
    }
}
