import axios from "axios";
import {
  LOGIN_USER,
  ONWORK_USER,
  OFFWORK_USER,
  HOLIDAYUSER_READ,
  HOLIDAYUSER_CREATE,
  WORKMANAGE_READ,
  WORKMANAGEUSERLIST_READ,
  WORKMANAGEDATA_SAVE,
  MYPAGE_READ,
  MYPAGE_CHECK,
  MYPAGEPASSWORD_UPDATE,
  USERWORK_READ,
  EMPLOYEEMANAGEUSERLIST_READ,
  EMPLOYEEMANAGEUSERMONTHLYLIST_READ,
  HOLIDAYPREZUSERLIST_READ,
  HOLIDAYUSERCONFIRM_UPDATE,
} from "./types";
//dataToSubmit에는 넘어온 body 데이터가 들어가 있다.;로그인 액션
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request, //true,false를 받는 부분
  };
}
//출근 버튼 액션
export function OnWorkUser(dataToSubmit) {
  const request = axios
    .post("/api/users/onwork", dataToSubmit)
    .then((response) => response.data);

  return {
    type: ONWORK_USER,
    payload: request, //true,false를 받는 부분
  };
}
//퇴근 버튼 액션
export function OffWorkUser(dataToSubmit) {
  const request = axios
    .post("/api/users/offwork", dataToSubmit)
    .then((response) => response.data);

  return {
    type: OFFWORK_USER,
    payload: request, //true,false를 받는 부분
  };
}
//메인화면 근무현황 Read
export function UserWorkRead(dataToSubmit) {
  const request = axios
    .post("/api/users/mainworkread", dataToSubmit)
    .then((response) => response.data);
  //console.log(request);
  return {
    type: USERWORK_READ,
    payload: request, //true,false를 받는 부분
  };
}
//연가 유저 데이터 Read
export function HolidayUserDataRead() {
  const request = axios
    .get("/api/users/holidayuserdataread")
    .then((response) => response.data);

  return {
    type: HOLIDAYUSER_READ,
    payload: request, //true,false를 받는 부분
  };
}
//연가 유저 데이터 Create
export function HolidayUserCreate(dataToSubmit) {
  const request = axios
    .post("/api/users/holidayusercreate", dataToSubmit)
    .then((response) => response.data);

  return {
    type: HOLIDAYUSER_CREATE,
    payload: request, //true,false를 받는 부분
  };
}
//업무조회 데이터 Read
export function WorkManageDataRead() {
  const request = axios
    .get("/api/users/workmanageread")
    .then((response) => response.data);

  return {
    type: WORKMANAGE_READ,
    payload: request, //true,false를 받는 부분
  };
}
//업무지시 직원리스트 READ
export function WorkManageUserListRead() {
  const request = axios
    .get("/api/users/workmanageuserlist")
    .then((response) => response.data);

  return {
    type: WORKMANAGEUSERLIST_READ,
    payload: request, //true,false를 받는 부분
  };
}
//업무지시로 보낸 메세지 Save(저장)
export function WorkManageDataSave(dataToSubmit) {
  const request = axios
    .post("/api/users/workmanagesave", dataToSubmit)
    .then((response) => response.data);

  return {
    type: WORKMANAGEDATA_SAVE,
    payload: request, //true,false를 받는 부분
  };
}
//마이페이지 유저 데이터 Read
export function MyPageUserDataRead() {
  const request = axios
    .get("/api/users/mypageread")
    .then((response) => response.data);

  return {
    type: MYPAGE_READ,
    payload: request, //true,false를 받는 부분
  };
}
//마이페이지 PasswordCheck
export function MyPagePasswordCheck(dataToSubmit) {
  const request = axios
    .post("/api/users/mypagepasswordcheck", dataToSubmit)
    .then((response) => response.data);

  return {
    type: MYPAGE_CHECK,
    payload: request, //true,false를 받는 부분
  };
}
//마이페이지 패스워드 Update
export function MyPagePasswordUpdate(dataToSubmit) {
  const request = axios
    .post("/api/users/mypagepasswordupdate", dataToSubmit)
    .then((response) => response.data);

  return {
    type: MYPAGEPASSWORD_UPDATE,
    payload: request, //true,false를 받는 부분
  };
}
//직원근무조회 유저리스트 Read
export function EmployeeManageUserListRead(dataToSubmit) {
  const request = axios
    .post("/api/users/employeemanageuserlist", dataToSubmit)
    .then((response) => response.data);

  return {
    type: EMPLOYEEMANAGEUSERLIST_READ,
    payload: request, //true,false를 받는 부분
  };
}

//직원근무조회 클릭 시 월별 근무 조회
export function EmployeeManageUserMonthlyListRead(dataToSubmit) {
  const request = axios
    .post("/api/users/employeemanageusermonthlylistread", dataToSubmit)
    .then((response) => response.data);

  return {
    type: EMPLOYEEMANAGEUSERMONTHLYLIST_READ,
    payload: request, //true,false를 받는 부분
  };
}
//직원의 연가 데이터 Read
export function HolidayPrezUserListRead() {
  const request = axios
    .get("/api/users/holidayprezuserlistread")
    .then((response) => response.data);

  return {
    type: HOLIDAYPREZUSERLIST_READ,
    payload: request, //true,false를 받는 부분
  };
}
//연가 승인 Update
export function HolidayUserConfirm(dataToSubmit) {
  const request = axios
    .post("/api/users/holidayuserconfirm", dataToSubmit)
    .then((response) => response.data);

  return {
    type: HOLIDAYUSERCONFIRM_UPDATE,
    payload: request, //true,false를 받는 부분
  };
}
