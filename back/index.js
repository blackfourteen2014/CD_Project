const express = require('express'); //express 모듈을 가져옴
const db   = require('./config/db'); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
const app = express(); //funtion을 이용하여 새로운 express app을 만듬
const port = 5000 //port number
const bodyParser = require('body-parser');
//router
const LoginRouter = require('./lib/LoginSystem'); //로그인, 로그아웃
const UserRouter = require('./lib/SystemServer/UserCRUD'); //직원 추가,읽기,삭제,수정
const CodeRouter = require('./lib/SystemServer/CodeCRD');
const MypageRouter = require('./lib/UserServer/MypageRU');
//웹에서 application/x-www-form-urlencoded에 있는 데이터를 분석해서 가져옴
  app.use(bodyParser.urlencoded({extended : true}));
//웹에서 application/json에 있는 데이터를 분석해서 가져옴
  app.use(bodyParser.json());
//session 사용 모듈
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const sessionDB = require('./config/sessionDB');
//session 사용
app.use(session({
    secret: 'asdqwe##',
    resave: false,
    saveUninitialized: true,
    store:new mysqlStore(sessionDB)
  }));

//페이지의 복잡성을 해소하기 위한 라우터
app.use('/api/users', LoginRouter);
app.use('/api/users', MypageRouter);
app.use('/api/system', UserRouter);
app.use('/api/system', CodeRouter);
//SystemServer로 옮길 예정================================================================================================
//holiday 테이블 삭제
app.post('/api/holidaydelete',(req,res)=>{
  //console.log(req.body.start);
    db.query(`DELETE FROM Holiday WHERE StartDate = ?`,[req.body.start],function(error,result){
      if(error){
        throw error;
      }
      return res.json({
        success : true
      });
    });
});
//근무부서 리스트 검색
app.post('/api/deptcodelist', (req,res) => {
    db.query('SELECT * from employee where dept like ?',[`%${req.body.SmallInfo}%`],(error,users)=>{
      if (error) throw error;
      let temp = [];
      let data = {};
      let i = 0;
      users.forEach(user => {
        data = {
          key: String(i+1),
          id: user.id,
          dept: user.dept,
          rank: user.rank,
          name: user.name,
          // password: user.password,
          email: user.email,
          phone: user.phone,
          zim: user.zim,
          address: user.address,
          des: user.des
        }
        i++;
        temp.push(data);
    });
    res.send(temp);
  });
});
//직원근무조회 근무부서 리스트 검색
app.post('/api/employeeworkdeptcodelist', (req,res) => {
  console.log(req.body);
  let sendData = []; 
  let data = {}; 
  let key = 0; 
  let workTime = 0;
  let workTimeSum = 0;
  db.query(' SELECT * from employeeWork Join employee ON employee.id = employeeWork.id where employee.dept = ?  AND employeework.Date = ?'
  ,[req.body.SmallInfo,req.body.SaveDate],(error,depts)=>{
    if(error) throw error;
    depts.forEach(user => {
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
//휴일설정 db에 저장
app.post('/api/holidaysave', (req, res) => {
  //console.log(req.body);
  db.query(`INSERT INTO holiday(StartDate,HoliManage,HoliContent) VALUES(?,?,?)`,
    [req.body.StartDate, req.body.SaveCode, req.body.HoliContent],(error,result) => 
  {
    if(error) 
    {
      return  res.json({
        holidaySaveSuccess: false,
          message: "실패"
          });  
    }
    return res.json({
      holidaySaveSuccess: true,
        message: "성공"
        });  
  });
});
//휴일 데이터 READ
app.get('/api/holidaydataread', (req, res) => {
  db.query('SELECT holi.StartDate,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;', (error, lists) => {
    if (error) throw error;
    //console.log('holiday date\n', lists);
    let temp = [];
    let data = {};
    lists.forEach(list => {
      data = {
        title : list.SmallInfo,
        start : list.StartDate,
        end : list.StartDate,
        allDay : false
      }
      temp.push(data);
    });
    res.send(temp);
  });
});
//휴일종류코드리스트
app.get('/api/holylist', (req,res) => {
  db.query('SELECT * from MasterCode where LargeInfo like ?',['%휴일%'],(error,data)=>{
    if(error) throw error;
    //console.log(data[0]);
    if(data[0] != undefined){
      db.query('SELECT * from SmallCode where SmallCode like ?',[`%${data[0].LargeCode}%`],(error2,depts)=>{
        if(error2) throw error2;
        //console.log(depts);
        res.send(depts);
      });
    } else {
      res.send(['']);
    }
  });
});
//부서코드리스트
  app.get('/api/deptlist', (req,res) => {
    db.query('SELECT * from MasterCode where LargeInfo like ?',['%부서%'],(error,data)=>{
      if(error) res.send(['']);
      //console.log(data[0].LargeCode);
      db.query('SELECT * from SmallCode where SmallCode like ?',[`%${data[0].LargeCode}%`],(error2,depts)=>{
        if(error2) res.send(['']);
        //console.log(depts);
        res.send(depts);
      });
    });
  });
//직급코드리스트
app.get('/api/ranklist', (req,res) => {
  db.query('SELECT * from MasterCode where LargeInfo like ?',['%직급%'],(error,data)=>{
    if(error) res.send(['']);
    //console.log(data[0].LargeCode);
    db.query('SELECT * from SmallCode where SmallCode like ?',[`%${data[0].LargeCode}%`],(error2,ranks)=>{
      if(error2) res.send(['']);
      //console.log(ranks);
      res.send(ranks);
    });
  });
});
//==============================================================================================================================

//UserServer로 옮길 예정=========================================================================================================
//출근 버튼(메인페이지 출근 버튼 누르고 또 누르면 출근을 이미 하였다고 뜨기)
app.post('/api/onWork',(req, res) => {
      db.query('SELECT * from employeeWork where id=? AND Date=?',[req.session.userId,req.body.date],(error, userDate) => {
        if(userDate[0] === undefined){ //다른 날짜 유무
          db.query(`INSERT INTO employeeWork(DATE,OnWork,id) VALUES(?,?,?)`,
          [req.body.date, req.body.time, req.session.userId],(error,result) => {
            if(error) throw error;
            return res.json({
              success : true,
              message:'ok'
            });
          });
        } else {
            return res.json({
              success : false,
              message:'no'
            });
        }
      });
    });
//퇴근 버튼
app.post('/api/offWork',(req, res) => {
  //console.log(req.body);
  db.query('SELECT * from employeeWork where id=? AND Date=?',[req.session.userId,req.body.date],(error, userDate) => {
    //console.log(userDate);
    if(userDate[0] != undefined){
      db.query(`update employeeWork SET OffWork =?,WorkContent=?,OverWorkContent=? where id=? AND Date=?`,
      [req.body.time,req.body.WorkContent,req.body.OverWorkContent,req.session.userId,req.body.date],(error,result) => {
        if(error) throw error;
        return res.json({
          success : true,
          message:'ok'
        });
      });
    } else {
        return res.json({
          success : false,
          message:'no'
        });
    }
  });
});
//로그인한 유저 정보
app.get('/api/userInfo',(req, res) => {
  //console.log(req.session.userId);
  db.query('SELECT * from employee where id = ?',[req.session.userId],(error, rows) => {
    if (error) throw error;
    return res.json({
      userID : rows[0].id,
      userName : rows[0].name
    });
  });
});
//근무조회
app.post('/api/worklist', (req, res) => {
  //console.log(req.body);
  const selectDate = req.body.CurrentYear + '/' + req.body.CurrentMonth;
  //console.log(selectDate);
  db.query('SELECT * from employeeWork where id=? and Date like ?',[req.session.userId,`${selectDate}%`], (error, works) => {
    if (error) throw error;
    let temp = [];
    let data = {};
    let i = 0;
    let workTime = 0;
    let workTimeSum = 0;
    works.forEach(work => {
      //console.log('OnWork: ',work.OnWork);
      //console.log('OnWorkSplit: ',Number(work.OnWork.split(':')[0]));
      //console.log('OffWork: ',work.OffWork);
      //console.log('OffWorkSplit: ',Number(work.OffWork.split(':')[0]));
      //console.log('workTime:',Number(work.OffWork.split(':')[0]) - Number(work.OnWork.split(':')[0]));
      if(work.OffWork != null){
        workTime = Number(work.OffWork.split(':')[0]) - Number(work.OnWork.split(':')[0]);
        workTimeSum += workTime;
      }else{
        workTime=0;
      }
      data = {
        key : String(i+1),
        date : work.Date,
        onWork: work.OnWork,
        offWork: work.OffWork,
        workTime: workTime,
        workContent: work.WorkContent,
        overWorkContent: work.OverWorkContent
      }
      temp.push(data);
      i++;
    });
    //res.send(temp);
    return res.json({
      workList : temp,
      workTimeSum
    });
  });
});

//연가 데이터 넣기 *테이블 이름과 주소 바꿀 예정
app.post('/api/holidayuserinsert',(req,res) => {
  //console.log(req.body);
  db.query('INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES(?,?,?,?,?,?)',
  [req.session.userId,req.body.StartDate,req.body.EndDate,req.body.SelectedLeave,req.body.Des,'승인대기'], (error, user) => {
    if (error) throw error;
    return res.json({
      success : true
    });
  });
});
//연가 데이터 조회
app.get('/api/holidayuserlist', (req, res) => {
  db.query('SELECT * from HolidayUser where id=?',[req.session.userId], (error, lists) => {
    if (error) throw error;
    let temp = [];
    let data = {};
    lists.forEach(list => {
      //console.log(list);
      data = {
        id : list.id,
        startDate: list.StartDate,
        endDate: list.EndDate,
        type: list.SelectedLeave,
        content: list.Des,
        confirmYN : list.confirmYN
      }
      temp.push(data);
    });
    res.send(temp);
  });
});
//업무 지시 데이터 저장
app.post('/api/workmanagesave',(req,res)=>{
  let success = true; //성공여부
  //console.log(req.body.checkUsers);
  //console.log(req.session.userId);
  //console.log(req.session.userName);
  const saveData = req.body;
  saveData.checkUsers.forEach(checkUser => {
    //console.log(checkUser.id);
    //console.log(saveData);
    db.query('INSERT INTO WorkManage (sendId,getId,startDate,endDate,title,workDes) VALUES(?,?,?,?,?,?)',
      [req.session.userId,checkUser.id,saveData.CurrentTime,saveData.EndDate,saveData.Title,saveData.Des], (error, result) => {
      if (error) success = false;
    });
  },res.send(success));
});
//업무조회 데이터 가져오기
app.get('/api/workmanageread',(req,res)=>{
  //console.log(req.session.userId);
  let sendData = [];
  let data = {};
  let i = 0;
  db.query('SELECT * from WorkManage Join employee ON employee.id = WorkManage.sendId where WorkManage.getId = ? ORDER BY startDate DESC',[req.session.userId],(error,reads)=>{
    if (error) throw error;
    //console.log(reads);
    reads.forEach(read => {
      //console.log(i,' : ',read);
      data = {
       key: String(i+1),
       Date: read.startDate,
       EndDate: read.endDate,
       Dept: read.dept,
       Rank : read.rank,
       User: read.name,
       Title: read.title,
       Dsc: read.workDes
      }
      sendData.push(data);
      i++;
    });
    res.send(sendData);
  });
});
//업무 지시 직원 리스트 출력
app.get('/api/workmanageuserlist',(req,res)=>{
  let listData = [];
  let data = {};
  let i = 0;
  //console.log(req.session.userId);
  db.query('SELECT * from employee where not id = ?',[req.session.userId],(error,userlist)=>{
    if(error)throw error;    
    //console.log(userlist);
    userlist.forEach(user => {
      //console.log(user.id);
      //console.log(user.name);
      data = {
        key : String(i+1),
        id : user.id,
        name : user.name
      }
      listData.push(data);
      i++;
    });
    res.send(listData);
  });
});
//직원근무조회 유저 데이터 GET
app.post('/api/employeemanageuserlist',(req,res)=>{
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
app.post('/api/employeemanageusermonthlylist',(req,res)=>{
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
//대표 유저 연가 조회
app.get('/api/holidayprezuserlist', (req, res) => {
  db.query('SELECT * from HolidayUser ORDER BY confirmYN DESC', (error, lists) => {
    if (error) throw error;
    let temp = [];
    let data = {};
    let key = 0;
    lists.forEach(list => {
      //console.log(list);
      data = {
        key : String(key+1),
        id : list.id,
        startDate: list.StartDate,
        endDate: list.EndDate,
        type: list.SelectedLeave,
        content: list.Des,
        confirmYN : list.confirmYN
      }
      temp.push(data);
      key++;
    });
    res.send(temp);
  });
});
//대표 유저 연가 승인
app.post('/api/holidayuserconfirm',(req,res)=>{
  //console.log(req.body[0].id);
  const userData = req.body;
  userData.forEach(user => {
    db.query('UPDATE HolidayUser SET confirmYN = ? where id = ? AND startDate = ? AND EndDate = ?',
    [
      '승인',
      user.id,
      user.startDate,
      user.endDate
    ],(error,result)=>{
    if(error)throw error;
    return res.json({
      success : true
    });
  });
  });
});

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
  console.log(`Example app listening at http://localhost:${port}`)
})