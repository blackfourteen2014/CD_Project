const express = require("express");
const router = express.Router();
const db = require("../config/db");
//근무부서 리스트 검색
router.post("/deptcodesearch", (req, res) => {
  db.query(
    "SELECT * from employee where dept like ?",
    [`%${req.body.SmallInfo}%`],
    (error, users) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      let key = 0;
      users.forEach((user) => {
        data = {
          key: String(key + 1),
          id: user.id,
          dept: user.dept,
          rank: user.rank,
          name: user.name,
          // password: user.password,
          email: user.email,
          phone: user.phone,
          zim: user.zim,
          address: user.address,
          des: user.des,
        };
        key++;
        temp.push(data);
      });
      res.send(temp);
    }
  );
});
//직원근무조회 부서로 검색
router.post("/employeeworkdeptcodelistsearch", (req, res) => {
  //console.log(req.body);
  let sendData = [];
  let data = {};
  let key = 0;
  let workTime = 0;
  let workTimeSum = 0;
  db.query(
    " SELECT * from employeeWork Join employee ON employee.id = employeeWork.id where employee.dept = ?  AND employeework.Date = ?",
    [req.body.SmallInfo, req.body.SaveDate],
    (error, depts) => {
      if (error) throw error;
      depts.forEach((user) => {
        if (user.OffWork != null) {
          workTime =
            Number(user.OffWork.split(":")[0]) -
            Number(user.OnWork.split(":")[0]);
          workTimeSum += workTime;
        } else {
          workTime = 0;
        }
        data = {
          key: String(key + 1),
          dept: user.dept,
          rank: user.rank,
          id: user.id,
          name: user.name,
          start: user.OnWork,
          end: user.OffWork,
          workTime: workTime,
        };
        sendData.push(data);
        key++;
      });
      res.send(sendData);
    }
  );
});
module.exports = router;
