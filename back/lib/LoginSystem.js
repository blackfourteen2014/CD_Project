//유저와 관련된 기능들
const express = require('express');
const router = express.Router();
const db = require('../config/db');

//로그아웃
router.get('/logout', (req, res) => {
    delete req.session.userId;
    return res.json({
        logoutSuccess : true
    });
});
//로그인(로그인 주소가 넘어옴)
// router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
    // 시스템 관리자 페이지 구분,GRANT
    if(req.body.email === 'root' && req.body.password === '1111'){
        return res.json({
        loginSuccess: true,
        message: "시스템 관리자",
        grant: 'system'
        });
    } else {
        db.query(`select * from employee where email='${req.body.email}'`, (err,userInfo) => { //검색 부분 (수정해야함. 다른 기능도 만들고 수정)
          if(err) throw err;
          if(userInfo[0] === undefined){
            return res.json({
              loginSuccess: false,
              message: "해당 이메일이 없습니다."
              });
          } else {
            console.log(userInfo[0].rank);
              if(req.body.email === userInfo[0].email && 
                req.body.password === userInfo[0].password && 
                userInfo[0].rank === '대표')
                {
                  req.session.userId = userInfo[0].id;
                  return res.json({
                  loginSuccess: true,
                  message: "로그인 성공!",
                  userID : userInfo[0].id,
                  grant: 'president'
                  });
                } 
              else if(req.body.email === userInfo[0].email && req.body.password === userInfo[0].password)
                {
                  req.session.userId = userInfo[0].id;
                  return res.json({
                  loginSuccess: true,
                  message: "로그인 성공!",
                  userID : userInfo[0].id,
                  grant: 'employee'
                  });
                } 
              else 
                { 
                  return res.json({
                  loginSuccess: false,
                  message: "이메일 또는 패스워드가 올바르지 않습니다."
                  });
                }
        } 
      });
    }
    
  });

module.exports = router;