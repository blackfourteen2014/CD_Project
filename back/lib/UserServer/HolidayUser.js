const express = require("express");
const router = express.Router();
const db = require("../../config/db");
//연가 유저 데이터 Read
router.get("/holidayuserdataread", (req, res) => {
  db.query(
    "SELECT * from HolidayUser where id=?",
    [req.session.userId],
    (error, lists) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      lists.forEach((list) => {
        //console.log(list);
        data = {
          id: list.id,
          startDate: list.StartDate,
          endDate: list.EndDate,
          type: list.SelectedLeave,
          content: list.Des,
          confirmYN: list.confirmYN,
        };
        temp.push(data);
      });
      res.send(temp);
    }
  );
});
//연가 유저 데이터 Create
router.post("/holidayusercreate", (req, res) => {
  //console.log(req.body);
  db.query(
    "INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES(?,?,?,?,?,?)",
    [
      req.session.userId,
      req.body.StartDate,
      req.body.EndDate,
      req.body.SelectedLeave,
      req.body.Des,
      "승인대기",
    ],
    (error, user) => {
      if (error) throw error;
      return res.json({
        success: true,
      });
    }
  );
});
//대표 유저 연가 조회
router.get("/holidayprezuserlistread", (req, res) => {
  db.query(
    "SELECT * from HolidayUser ORDER BY confirmYN DESC",
    (error, lists) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      let key = 0;
      lists.forEach((list) => {
        //console.log(list);
        data = {
          key: String(key + 1),
          id: list.id,
          startDate: list.StartDate,
          endDate: list.EndDate,
          type: list.SelectedLeave,
          content: list.Des,
          confirmYN: list.confirmYN,
        };
        temp.push(data);
        key++;
      });
      res.send(temp);
    }
  );
});
//대표 유저 연가 승인
router.post("/holidayuserconfirm", (req, res) => {
  //console.log(req.body[0].id);
  const userData = req.body;
  userData.forEach((user) => {
    db.query(
      "UPDATE HolidayUser SET confirmYN = ? where id = ? AND startDate = ? AND EndDate = ?",
      ["승인", user.id, user.startDate, user.endDate],
      (error, result) => {
        if (error) throw error;
        return res.json({
          success: true,
        });
      }
    );
  });
});
module.exports = router;
