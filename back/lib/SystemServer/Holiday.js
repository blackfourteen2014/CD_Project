const express = require("express");
const router = express.Router();
const db = require("../../config/db");
//휴일 데이터 READ
router.get("/holidaydataread", (req, res) => {
  db.query(
    "SELECT holi.StartDate,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;",
    (error, lists) => {
      if (error) throw error;
      //console.log('holiday date\n', lists);
      let temp = [];
      let data = {};
      let key = 0;
      lists.forEach((list) => {
        data = {
          key: String(key + 1),
          title: list.SmallInfo,
          start: list.StartDate,
          end: list.StartDate,
          allDay: false,
        };
        key++;
        temp.push(data);
      });
      res.send(temp);
    }
  );
});
//휴일 데이터 Create
router.post("/holidaycreate", (req, res) => {
  //console.log(req.body);
  db.query(
    `INSERT INTO holiday(StartDate,HoliManage,HoliContent) VALUES(?,?,?)`,
    [req.body.StartDate, req.body.SaveCode, req.body.HoliContent],
    (error, result) => {
      if (error) {
        return res.json({
          holidaySaveSuccess: false,
          message: "실패",
        });
      }
      return res.json({
        holidaySaveSuccess: true,
        message: "성공",
      });
    }
  );
});
//휴일 데이터 Delete
router.post("/holidaydelete", (req, res) => {
  //console.log(req.body.start);
  db.query(
    `DELETE FROM Holiday WHERE StartDate = ?`,
    [req.body.start],
    function (error, result) {
      if (error) {
        throw error;
      }
      return res.json({
        success: true,
      });
    }
  );
});
//휴일종류코드리스트 Read
router.get("/holycodelistread", (req, res) => {
  db.query(
    "SELECT * from MasterCode where LargeInfo like ?",
    ["%휴일%"],
    (error, data) => {
      if (error) throw error;
      //console.log(data[0]);
      if (data[0] != undefined) {
        db.query(
          "SELECT * from SmallCode where SmallCode like ?",
          [`%${data[0].LargeCode}%`],
          (error2, depts) => {
            if (error2) throw error2;
            //console.log(depts);
            res.send(depts);
          }
        );
      } else {
        res.send([""]);
      }
    }
  );
});
module.exports = router;
