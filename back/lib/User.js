//유저와 관련된 기능들
const express = require('express');
const session = require('express-session'); //session
const mysqlStore = require('express-mysql-session')(session); //session stroe
const router = express.Router();
const db = require('../config/db');
const app = express();

app.use(session({
    secret: 'asdfqwerzxcv@!@##@%!qwe',
    resave: false,
    saveUninitialized: true,
    stroe:new mysqlStore({
      host:'localhost',
      port:3306,
      user:'root',
      password:'1111',
      database : 'boiler_plate'
    })
  }))

//로그인(로그인 주소가 넘어옴)
router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
    console.log(req.session);
    db.query(`SELECT * from users`, (err,userInfo) => { //검색 부분 (수정해야함. 다른 기능도 만들고 수정)
        console.log(userInfo[0].email);
        if(err) throw err;
        //DB의 첫번째 유저의 데이터랑 front에서 가져온 데이터랑 비교
        if(req.body.email === userInfo[0].email){
            return res.json({
            loginSuccess: true,
            message: "로그인 성공!"
            });
        }else{
            return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }
    });
});
//회원가입(register router)
router.post('/register',(req, res) =>{
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    console.log(req.body);
    db.query(`INSERT INTO users (email, password, name) VALUES(?, ?, ?)`,[req.body.email,req.body.password,req.body.name],(err,result) => {
        if(err) throw err;
    });
    return res.json({
        registerSuccess: true,
        message: "회원가입 성공!"
        });
  });

module.exports = router;