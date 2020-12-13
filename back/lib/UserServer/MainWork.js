const express = require("express");
const router = express.Router();
const db = require("../../config/db");
//직원 및 대표 메인화면 근무조회 Read
router.post("/mainworkread", (req, res) => {
  //console.log(req.body);
  const selectDate = req.body.CurrentYear + "/" + req.body.CurrentMonth;
  //console.log(selectDate);
  db.query(
    "SELECT * from employeeWork where id=? and Date like ?",
    [req.session.userId, `${selectDate}%`],
    (error, works) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      let i = 0;
      let workTime = 0;
      let workTimeSum = 0;
      works.forEach((work) => {
        //console.log(work);
        //console.log('OnWork: ',work.OnWork);
        //console.log('OnWorkSplit: ',Number(work.OnWork.split(':')[0]));
        //console.log('OffWork: ',work.OffWork);
        //console.log('OffWorkSplit: ',Number(work.OffWork.split(':')[0]));
        //console.log('workTime:',Number(work.OffWork.split(':')[0]) - Number(work.OnWork.split(':')[0]));
        if (work.OffWork != null) {
          workTime =
            Number(work.OffWork.split(":")[0]) -
            Number(work.OnWork.split(":")[0]);
          workTimeSum += workTime;
          //console.log(`시작${i} : `,workTimeSum);
        } else {
          workTime = 0;
        }
        data = {
          key: String(i + 1),
          date: work.Date,
          onWork: work.OnWork,
          offWork: work.OffWork,
          workTime: workTime,
          workContent: work.WorkContent,
          overWorkContent: work.OverWorkContent,
        };
        temp.push(data);
        i++;
      });
      //res.send(temp);
      return res.json({
        workList: temp,
        workTimeSum,
      });
    }
  );
});

module.exports = router;
