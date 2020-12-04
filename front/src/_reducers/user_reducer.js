import {
    LOGIN_USER,
    CREATE_USER,
    UPDATE_USER,
    HOLIDAY_CREATE,
    SMALLCODE_CREATE,
    LARGECODE_CREATE,
    ONWORK_USER,
    OFFWORK_USER,
    HOLIDAY_USER,
    MYPAGE_USER,
} from '../_actions/types';
//이전state 값과 action값을 묶어서 store(index.js)로 보냄
export default function(state= {}, action) {
    switch (action.type){ //액션을 보낼 곳
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }

        case CREATE_USER:
            return { ...state, CreateSuccess: action.payload }

        case UPDATE_USER:
            return { ...state, UpdateSuccess: action.payload }

        case HOLIDAY_CREATE:
            return { ...state, holidaySaveSuccess: action.payload }

        case SMALLCODE_CREATE:
            return { ...state, smallcodeSaveSuccess: action.payload }

        case LARGECODE_CREATE:
            return { ...state, largecodeSaveSuccess: action.payload }

        case ONWORK_USER:
            return { ...state, success: action.payload }

        case OFFWORK_USER:
            return { ...state, success: action.payload }

        case HOLIDAY_USER:
            return { ...state, success: action.payload }

        case MYPAGE_USER:
            return { ...state, success: action.payload }
            
        default:
            return state;
    }
}