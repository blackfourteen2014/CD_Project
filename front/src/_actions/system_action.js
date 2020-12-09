import axios from 'axios';
import {
    HOLIDAY_READ,
    HOLIDAY_CREATE,
    SMALLCODE_CREATE,
    LARGECODE_CREATE,
    USER_CREATE,
    USER_UPDATE
} from './types';
//휴일 데이터 Read
export function HolidayDataRead(){
    const request = axios.get('/api/system/holidaydataread')
        .then(response => response.data)

    return {
        type: HOLIDAY_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//휴일 데이터 Create
export function HolidayCreate(dataToSubmit){
    const request = axios.post('/api/system/holidaycreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//소코드 데이터 Create
export function SmallCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/smallcodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//대코드 데이터 Create
export function MasterCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/mastercodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: LARGECODE_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
// 유저 데이터 Create
export function UserCreate(dataToSubmit){
    const request = axios.post('/api/system/create', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: USER_CREATE,
        payload: request //true,false를 받는 부분
    }
}
// 유저 데이터 Update
export function UserUpdate(dataToSubmit){
    const request = axios.post('/api/system/update', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: USER_UPDATE,
        payload: request //true,false를 받는 부분
    }
}