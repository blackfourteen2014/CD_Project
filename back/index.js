const express = require("express"); //express 모듈을 가져옴
const db = require("./config/db"); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
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
    secret: "asdqwe##",
    resave: false,
    saveUninitialized: true,
    store: new mysqlStore(sessionDB),
  })
);
//기능의 복잡성을 해소하기 위한 라우터 사용
//router
//require
//all
const LoginRouter = require("./lib/LoginSystem"); //로그인, 로그아웃
//user
const MypageRouter = require("./lib/UserServer/Mypage"); //유저 마이페이지 기능
const OnOffWorkRouter = require("./lib/UserServer/OnOffWork"); //유저 출퇴근 기능
const UserControllerRouter = require("./lib/UserServer/UserController"); //유저 기능과 관련된 전반적인 제어장치
const MainWorkRouter = require("./lib/UserServer/MainWork"); //유저 메인화면 근무조회 기능
const HolidayUser = require("./lib/UserServer/HolidayUser"); //유저 연가 기능
const WorkManageRouter = require("./lib/UserServer/WorkManage");
const EmployeeManageRouter = require("./lib/UserServer/EmployeeManage");
//system
const UserRouter = require("./lib/SystemServer/User"); //직원 추가,읽기,삭제,수정
const CodeRouter = require("./lib/SystemServer/Code");
const HolidayRouter = require("./lib/SystemServer/Holiday");
const SearchRouter = require("./lib/Search");
//
//use
//all
app.use("/api", LoginRouter); //로그인
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
//
//
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
