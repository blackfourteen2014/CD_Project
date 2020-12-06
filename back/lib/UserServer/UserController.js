const express = require('express');
const router = express.Router();
const db = require('../../config/db');
//로그인한 유저 정보 Read
router.get('/userdataread',(req, res) => {
    //console.log(req.session.userId);
    db.query('SELECT * from employee where id = ?',[req.session.userId],(error, rows) => {
      if (error) throw error;
      return res.json({
        userID : rows[0].id,
        userName : rows[0].name
      });
    });
  });

module.exports = router;