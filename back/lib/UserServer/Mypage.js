const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const crypto = require("crypto"); // 비밀번호 암호화
//마이페이지 Read
router.get("/mypageread", (req, res) => {
  db.query(
    "SELECT * from employee where id =?",
    [req.session.userId],
    (error, user) => {
      if (error) throw error;
      //console.log('User info is \n', user);
      res.send(user);
    }
  );
});
//마이페이지 PasswordCheck
router.post("/mypagepasswordcheck", (req, res) => {
  //console.log('1:',req.body.Password);
  //console.log('2:',req.session.userId);
  //console.log(req.body);
  const password = crypto
    .createHash("sha512")
    .update(req.body.Password)
    .digest("base64");
  db.query(
    "SELECT * from employee where id =?",
    [req.session.userId],
    (error, user) => {
      if (error) throw error;
      //console.log('User info is \n', user[0].password);
      if (user[0].password === password) {
        return res.json({
          success: true,
        });
      } else {
        return res.json({
          success: false,
        });
      }
    }
  );
});
//마이페이지 PasswordUpdate
router.post("/mypagepasswordupdate", (req, res) => {
  //console.log(req.body);
  const password = crypto
    .createHash("sha512")
    .update(req.body.Password)
    .digest("base64");
  db.query(
    `UPDATE employee SET PASSWORD = ? WHERE id = ? `,
    [password, req.body.id],
    (error, result) => {
      if (error) res.send([""]);
      //console.log(depts);
      res.json({
        success: true,
      });
    }
  );
});

module.exports = router;
