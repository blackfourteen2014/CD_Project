import axios from 'axios';
import {
    HOLIDAY_INFO,
    SMALLCODE_INFO,
    
} from './types';

export function holidayInfo(dataToSubmit){
    const request = axios.post('/api/holidaysave', dataToSubmit)
        .then(response => response.data)

    return {
        type: HOLIDAY_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}
export function SmallCodeInfo(dataToSubmit){
    const request = axios.post('/api/SmallCodeSave', dataToSubmit)
        .then(response => response.data)

    return {
        type: SMALLCODE_INFO,
        payload: request //서버의 res.json() 값을 가져온다.
    }
}