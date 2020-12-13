import {
  LOGIN_USER,
  USER_CREATE,
  USER_UPDATE,
  HOLIDAY_CREATE,
  SMALLCODE_CREATE,
  MASTERCODE_CREATE,
  ONWORK_USER,
  OFFWORK_USER,
  HOLIDAYUSER_CREATE,
  MYPAGE_CHECK,
  MYPAGEPASSWORD_UPDATE,
} from "../_actions/types";
//이전state 값과 action값을 묶어서 store(index.js)로 보냄
export default function (state = {}, action) {
  switch (
    action.type //액션을 보낼 곳
  ) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case USER_CREATE:
      return { ...state, CreateSuccess: action.payload };

    case USER_UPDATE:
      return { ...state, UpdateSuccess: action.payload };

    case HOLIDAY_CREATE:
      return { ...state, holidaySaveSuccess: action.payload };

    case SMALLCODE_CREATE:
      return { ...state, smallcodeSaveSuccess: action.payload };

    case MASTERCODE_CREATE:
      return { ...state, largecodeSaveSuccess: action.payload };

    case ONWORK_USER:
      return { ...state, success: action.payload };

    case OFFWORK_USER:
      return { ...state, success: action.payload };

    case HOLIDAYUSER_CREATE:
      return { ...state, success: action.payload };

    case MYPAGE_CHECK:
      return { ...state, success: action.payload };
    case MYPAGEPASSWORD_UPDATE:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
