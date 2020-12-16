const express = require("express"); //express 모듈을 가져옴
// const db = require("./config/db"); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
const app = express(); //funtion을 이용하여 새로운 express app을 만듬
const port = 5000; //port number
const bodyParser = require("body-parser");
//웹에서 application/x-www-form-urlencoded에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
//웹에서 application/json에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.json());
//session 사용 모듈
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const sessionDB = require("./config/sessionDB");
//session 사용
app.use(
  session({
    secret: "asdqwe##", //암호화. 수정 가능
    resave: false,
    saveUninitialized: true,
    store: new mysqlStore(sessionDB),
  })
);
//기능의 복잡성을 해소하기 위한 라우터(router)
//all
const LoginRouter = require("./lib/LoginSystem"); //로그인, 로그아웃
const SearchRouter = require("./lib/Search"); //검색 관련
//user
const OnOffWorkRouter = require("./lib/UserServer/OnOffWork"); //출퇴근
const UserControllerRouter = require("./lib/UserServer/UserController"); //유저 로그인 시 이름 데이터 표시
const MainWorkRouter = require("./lib/UserServer/MainWork"); //메인화면 근무조회
const HolidayUser = require("./lib/UserServer/HolidayUser"); //연가
const WorkManageRouter = require("./lib/UserServer/WorkManage"); //업무조회 및 지시
const MypageRouter = require("./lib/UserServer/Mypage"); //마이페이지
const EmployeeManageRouter = require("./lib/UserServer/EmployeeManage"); //대표 화면 직원 근무 조회
//system
const HolidayRouter = require("./lib/SystemServer/Holiday"); //휴일 설정
const UserRouter = require("./lib/SystemServer/User"); //직원 관리
const CodeRouter = require("./lib/SystemServer/Code"); //공통 코드

//라우터 사용(use)
//all
app.use("/api", LoginRouter);
app.use("/api", SearchRouter);
//user
app.use("/api/users", UserControllerRouter);
app.use("/api/users", MypageRouter);
app.use("/api/users", OnOffWorkRouter);
app.use("/api/users", MainWorkRouter);
app.use("/api/users", HolidayUser);
app.use("/api/users", WorkManageRouter);
app.use("/api/users", EmployeeManageRouter);
//system
app.use("/api/system", UserRouter);
app.use("/api/system", CodeRouter);
app.use("/api/system", HolidayRouter);

//비밀번호 예시============================================================================================
// const crypto = require('crypto');
// const password = '123q';
// const pass = crypto.createHash('sha512').update(password).digest('base64');
// const pass2 = crypto.createHash('sha512').update(password).digest('base64');

// if(pass === pass2){
//   console.log('같다');
// }else{
//   console.log('다르다');
// }
//========================================================================================================

//port number를 콘솔에 출력
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
