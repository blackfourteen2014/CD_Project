const express = require('express');
const router = express.Router();
const db = require('../../config/db');

//직원근무조회 유저 데이터 GET
router.post('/employeemanageuserlist',(req,res)=>{
    //console.log(req.body[0]);
    let DateData = req.body[0];
    let sendData = []; //보낼 값
    let data = {}; //보낼 곳에 넣을 값
    let key = 0; //테이블을 사용하기 위한 키값
    let workTime = 0;
    let workTimeSum = 0;
    db.query('SELECT * from employeeWork Join employee ON employee.id = employeeWork.id where Date = ?',
      [DateData],(error,userList)=>{
        if(error) throw error;
        userList.forEach(user => {
          //console.log(user.id);
          if(user.OffWork != null){
            workTime = Number(user.OffWork.split(':')[0]) - Number(user.OnWork.split(':')[0]);
            workTimeSum += workTime;
          }else{
            workTime = 0;
          }
          data = {
            key : String(key+1),
            dept : user.dept,
            rank : user.rank,
            id : user.id,
            name : user.name,
            start : user.OnWork,
            end : user.OffWork,
            workTime : workTime
          }
          sendData.push(data);
          key++;
        });
        res.send(sendData);
    });
});
//직원 월별 근무 조회 GET
router.post('/employeemanageusermonthlylistread',(req,res)=>{
    //console.log(req.body);
    //console.log(req.body.CurrentDate.split('/')[0]);
    //console.log(req.body.CurrentDate.split('/')[1]);
    //console.log(splitDate);
    let sendData = []; //보낼 데이터
    let data = {};  //보낼 데이터에 넣을 데이터
    let key = 0; //키값
    let workTime = 0;
    let workTimeSum = 0; //근무시간 총합
    const splitDate = req.body.SaveDate.split('/')[0] + '/' + req.body.SaveDate.split('/')[1];
  
    db.query('SELECT * from employeeWork where id=? and Date like ?',[req.body.UserID,`${splitDate}%`], (error, userlist) => {
      if (error) throw error;
      //console.log(userlist);
      userlist.forEach(user => {
        if(user.OffWork != null){
          workTime = Number(user.OffWork.split(':')[0]) - Number(user.OnWork.split(':')[0]);
          workTimeSum += workTime;
        }else{
          workTime = 0;
        }
        data = {
          key : String(key+1),
          date : user.Date,
          onWork : user.OnWork,
          offWork : user.OffWork,
          workContent : user.WorkContent,
          overWorkContent : user.OverWorkContent,
          workTime : workTime
        }
        sendData.push(data);
        key++;
      });
      //res.send(sendData);
      return res.json({
        userList : sendData,
        userWorkTimeSum : workTimeSum
      });
    });
  });

module.exports = router;