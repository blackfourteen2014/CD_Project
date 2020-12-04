import axios from 'axios';
import {
    HOLIDAY_CREATE,
    SMALLCODE_CREATE,
    LARGECODE_CREATE
} from './types';
//휴일 추가
export function HolidayCreate(dataToSubmit){
    const request = axios.post('/api/system/holidaycreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//소코드 추가
export function SmallCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/smallcodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//대코드 추가
export function MasterCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/mastercodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: LARGECODE_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}