const express = require('express');
const router = express.Router();
const db = require('../../config/db');
//마이페이지 Read
router.get('/mypageread', (req, res) => {
    db.query('SELECT * from employee where id =?',[req.session.userId], (error, user) => {
      if (error) throw error;
      //console.log('User info is \n', user);
      res.send(user);
    });
  });
//마이페이지 PasswordCheck
router.post('/mypagepasswordcheck', (req, res) => {
    //console.log('1:',req.body.Password);
    //console.log('2:',req.session.userId);
    db.query('SELECT * from employee where id =?',[req.session.userId], (error, user) => {
      if (error) throw error;
      //console.log('User info is \n', user[0].password);
      if(user[0].password === req.body.Password){
        return res.json({
          success : true
        });
      }else{
        return res.json({
          success : false
        });
      }
    });
  });
//마이페이지 PasswordUpdate
router.post('/mypagepasswordupdate',(req,res)=>{
    //console.log(req.body);
    db.query(`UPDATE employee SET PASSWORD = ? WHERE id = ? `,
    [req.body.Password, req.body.id],(error,result) => {
      if(error) res.send(['']);
      //console.log(depts);
      res.json({
        success : true
      });
    });
  });

module.exports = router;
