const express = require("express");
const router = express.Router();
const db = require("../../config/db");

//출근 버튼(메인페이지 출근 버튼 누르고 또 누르면 출근을 이미 하였다고 뜨기)
router.post("/onwork", (req, res) => {
  db.query(
    "SELECT * from employeeWork where id=? AND Date=?",
    [req.session.userId, req.body.date],
    (error, userDate) => {
      if (userDate[0] === undefined) {
        //다른 날짜 유무
        db.query(
          `INSERT INTO employeeWork(DATE,OnWork,id) VALUES(?,?,?)`,
          [req.body.date, req.body.time, req.session.userId],
          (error, result) => {
            if (error) throw error;
            return res.json({
              success: true,
              message: "ok",
            });
          }
        );
      } else {
        return res.json({
          success: false,
          message: "no",
        });
      }
    }
  );
});
//퇴근 버튼
router.post("/offwork", (req, res) => {
  //console.log(req.body);
  db.query(
    "SELECT * from employeeWork where id=? AND Date=?",
    [req.session.userId, req.body.date],
    (error, userDate) => {
      //console.log(userDate);
      if (userDate[0] != undefined) {
        db.query(
          `update employeeWork SET OffWork =?,WorkContent=?,OverWorkContent=? where id=? AND Date=?`,
          [
            req.body.time,
            req.body.WorkContent,
            req.body.OverWorkContent,
            req.session.userId,
            req.body.date,
          ],
          (error, result) => {
            if (error) throw error;
            return res.json({
              success: true,
              message: "ok",
            });
          }
        );
      } else {
        return res.json({
          success: false,
          message: "no",
        });
      }
    }
  );
});

module.exports = router;
