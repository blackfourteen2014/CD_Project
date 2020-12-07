const express = require('express');
const router = express.Router();
const db = require('../../config/db');
//연가 유저 데이터 Read
router.get('/holidayuserdataread', (req, res) => {
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
//연가 유저 데이터 Create
router.post('/holidayusercreate',(req,res) => {
    //console.log(req.body);
    db.query('INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES(?,?,?,?,?,?)',
    [req.session.userId,req.body.StartDate,req.body.EndDate,req.body.SelectedLeave,req.body.Des,'승인대기'], (error, user) => {
      if (error) throw error;
      return res.json({
        success : true
      });
    });
});

module.exports = router;