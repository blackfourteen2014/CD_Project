import axios from 'axios';
import {
    HOLIDAY_READ,
    HOLIDAY_CREATE,
    HOLIDAY_DELETE,
    HOLYCODELIST_READ,
    SMALLCODE_READ,
    SMALLCODE_CREATE,
    SMALLCODE_DELETE,
    MASTERCODESEARCHLIST_READ,
    MASTERCODE_READ,
    MASTERCODE_CREATE,
    MASTERCODE_DELETE,
    USER_READ,
    USER_CREATE,
    USER_UPDATE,
    USER_DELETE,
    DEPTCODELIST_READ,
    RANKCODELIST_READ
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
//휴일 데이터 Delete
export function HolidayDelete(dataToSubmit){
    const request = axios.post('/api/system/holidaydelete', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_DELETE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//휴일종류 코드 리스트 Read
export function HolyCodeListRead(){
    const request = axios.get('/api/system/holycodelistread')
        .then(response => response.data)

    return {
        type: HOLYCODELIST_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//소코드 데이터 Read
export function SmallCodeRead(){
    const request = axios.get('/api/system/smallcoderead')
        .then(response => response.data)

    return {
        type: SMALLCODE_READ,
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
//소코드 데이터 Delete
export function SmallCodeDelete(dataToSubmit){
    const request = axios.post('/api/system/smallcodedelete', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_DELETE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//소코드 페이지에서 대코드 리스트 검색 창 Read
export function MasterCodeSearchListRead(dataToSubmit){
    const request = axios.post('/api/system/mastercodesearchlistread', dataToSubmit)
        .then(response => response.data)

    return {
        type: MASTERCODESEARCHLIST_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//대코드 데이터 Read
export function MasterCodeRead(){
    const request = axios.get('/api/system/mastercoderead')
        .then(response => response.data)

    return {
        type: MASTERCODE_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//대코드 데이터 Create
export function MasterCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/mastercodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: MASTERCODE_CREATE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//대코드 데이터 Delete
export function MasterCodeDelete(dataToSubmit){
    const request = axios.post('/api/system/mastercodedelete', dataToSubmit)
        .then(response => response.data)

    return {
        type: MASTERCODE_DELETE,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
// 유저 데이터 Read
export function UserRead(){
    const request = axios.get('/api/system/read')
        .then(response => response.data)

    return {
        type: USER_READ,
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
//유저 데이터 Delete
export function UserDelete(dataToSubmit){
    const request = axios.post('/api/system/delete', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: USER_DELETE,
        payload: request //true,false를 받는 부분
    }
}
//부서코드 리스트 Read
export function DeptCodeListRead(){
    const request = axios.get('/api/system/deptlist')
        .then(response => response.data)

    return {
        type: DEPTCODELIST_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
//직급코드  리스트 Read
export function RankCodeListRead(){
    const request = axios.get('/api/system/ranklist')
        .then(response => response.data)

    return {
        type: RANKCODELIST_READ,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}