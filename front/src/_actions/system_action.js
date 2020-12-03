import axios from 'axios';
import {
    HOLIDAY_INFO,
    SMALLCODE_INFO,
    LARGECODE_INFO,
    //SMALLCODEUPDATE_INFO
} from './types';

export function holidayInfo(dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
export function SmallCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/smallcodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}

export function MasterCodeCreate(dataToSubmit){
    const request = axios.post('/api/system/mastercodecreate', dataToSubmit)
        .then(response => response.data)

    return {
        type: LARGECODE_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
// //스몰 코드 수정
// export function SmallCodeUpdateConfirm(dataToSubmit){
//     const request = axios.post('/api/smallcodeupdate', dataToSubmit)
//         .then(response => response.data)

//     return {
//         type: SMALLCODEUPDATE_INFO,
//         payload: request //서버의 res.json() 값을 가져온다.
//     }
// }