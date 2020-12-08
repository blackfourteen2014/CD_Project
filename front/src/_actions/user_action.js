import axios from 'axios';
import {
    LOGIN_USER,
    ONWORK_USER,
    OFFWORK_USER,
    HOLIDAYUSER_READ,
    HOLIDAYUSER_CREATE,
    WORKMANAGE_READ,
    MYPAGE_READ,
    MYPAGE_CHECK,
    MYPAGEPASSWORD_UPDATE,
    USERWORK_READ
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
//메인화면 근무현황 Read
export function UserWorkRead(dataToSubmit){
    const request = axios.post('/api/users/mainworkread', dataToSubmit)
        .then(response => response.data)
    //console.log(request);
    return {
        type: USERWORK_READ,
        payload: request //true,false를 받는 부분
    }
}
//연가 유저 데이터 Read
export function HolidayUserDataRead(){
    const request = axios.get('/api/users/holidayuserdataread')
        .then(response => response.data)
    
    return {
        type: HOLIDAYUSER_READ,
        payload: request //true,false를 받는 부분
    }
}
//연가 유저 데이터 Create
export function HolidayUserCreate(dataToSubmit){
    const request = axios.post('/api/users/holidayusercreate', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: HOLIDAYUSER_CREATE,
        payload: request //true,false를 받는 부분
    }
}
//업무조회 데이터 Read
export function WorkManageDataRead(){
    const request = axios.get('/api/workmanageread')
        .then(response => response.data)
    
    return {
        type: WORKMANAGE_READ,
        payload: request //true,false를 받는 부분
    }
}
//마이페이지 유저 데이터 Read
export function MyPageUserDataRead(){
    const request = axios.get('/api/users/mypageread')
        .then(response => response.data)
    
    return {
        type: MYPAGE_READ,
        payload: request //true,false를 받는 부분
    }
}
//마이페이지 PasswordCheck
export function MyPagePasswordCheck(dataToSubmit){
    const request = axios.post('/api/users/mypagepasswordcheck', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: MYPAGE_CHECK,
        payload: request //true,false를 받는 부분
    }
}
//마이페이지 패스워드 Update
export function MyPagePasswordUpdate(dataToSubmit){
    const request = axios.post('/api/users/mypagepasswordupdate', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: MYPAGEPASSWORD_UPDATE,
        payload: request //true,false를 받는 부분
    }
}
