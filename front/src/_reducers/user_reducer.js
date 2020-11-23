import {
    LOGIN_USER,
    REGISTER_USER,
    HOLIDAY_INFO,
<<<<<<< HEAD
<<<<<<< HEAD
    SMALLCODE_INFO,
    ONWORK_USER
=======

=======
>>>>>>> updateMain/main
    SMALLCODE_INFO,
    ONWORK_USER
<<<<<<< HEAD

>>>>>>> updateMain/main
=======
>>>>>>> updateMain/main
} from '../_actions/types';
//이전state 값과 action값을 묶어서 store(index.js)로 보냄
export default function(state= {}, action) {
    switch (action.type){ //액션을 보낼 곳
        case LOGIN_USER:
                return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
                return { ...state, registerSuccess: action.payload }
            break;
            case HOLIDAY_INFO:
                return { ...state, holidaySaveSuccess: action.payload }
            break; 
<<<<<<< HEAD
<<<<<<< HEAD
            case SMALLCODE_INFO:
                return { ...state, smallcodeSaveSuccess: action.payload }
            case ONWORK_USER:
                return { ...state, success: action.payload }
=======

=======
>>>>>>> updateMain/main
            case SMALLCODE_INFO:
                return { ...state, smallcodeSaveSuccess: action.payload }
            break;
            case ONWORK_USER:
                return { ...state, success: action.payload }
<<<<<<< HEAD

>>>>>>> updateMain/main
=======
>>>>>>> updateMain/main
            break; 
        default:
            return state;
    }
}