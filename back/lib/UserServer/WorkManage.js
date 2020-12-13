const express = require("express");
const router = express.Router();
const db = require("../../config/db");

router.post("/workmanagesave", (req, res) => {
  let success = true; //성공여부
  //console.log(req.body.checkUsers);
  //console.log(req.session.userId);
  //console.log(req.session.userName);
  const saveData = req.body;
  saveData.checkUsers.forEach((checkUser) => {
    //console.log(checkUser.id);
    //console.log(saveData);
    db.query(
      "INSERT INTO WorkManage (sendId,getId,startDate,endDate,title,workDes) VALUES(?,?,?,?,?,?)",
      [
        req.session.userId,
        checkUser.id,
        saveData.CurrentTime,
        saveData.EndDate,
        saveData.Title,
        saveData.Des,
      ],
      (error, result) => {
        if (error) success = false;
      }
    );
  }, res.send(success));
});
//업무조회 데이터 가져오기
router.get("/workmanageread", (req, res) => {
  //console.log(req.session.userId);
  let sendData = [];
  let data = {};
  let key = 0;
  db.query(
    "SELECT * from WorkManage Join employee ON employee.id = WorkManage.sendId where WorkManage.getId = ? ORDER BY startDate DESC",
    [req.session.userId],
    (error, reads) => {
      if (error) throw error;
      //console.log(reads);
      reads.forEach((read) => {
        //console.log(i,' : ',read);
        data = {
          key: String(key + 1),
          Date: read.startDate,
          EndDate: read.endDate,
          Dept: read.dept,
          Rank: read.rank,
          User: read.name,
          Title: read.title,
          Dsc: read.workDes,
        };
        sendData.push(data);
        key++;
      });
      res.send(sendData);
    }
  );
});
//업무 지시 직원 리스트 출력
router.get("/workmanageuserlist", (req, res) => {
  let listData = [];
  let data = {};
  let key = 0;
  //console.log(req.session.userId);
  db.query(
    "SELECT * from employee where not id = ?",
    [req.session.userId],
    (error, userlist) => {
      if (error) throw error;
      //console.log(userlist);
      userlist.forEach((user) => {
        //console.log(user.id);
        //console.log(user.name);
        data = {
          key: String(key + 1),
          id: user.id,
          name: user.name,
        };
        listData.push(data);
        key++;
      });
      res.send(listData);
    }
  );
});

module.exports = router;
