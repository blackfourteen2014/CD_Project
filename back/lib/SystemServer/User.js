const express = require('express');
const router = express.Router();
const db = require('../../config/db');
//직원 관리 데이터 추가
router.post('/create',(req, res) =>{
    //console.log(req.body);
   db.query(`INSERT INTO employee(id, name, password, email, phone, zim, address, des, dept, rank) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.body.id, req.body.name, req.body.password, req.body.email, req.body.phone, req.body.zim, req.body.address, req.body.des, req.body.dept, req.body.rank],(err,result) => {
        if(err) {
            return  res.json({
                CreateSuccess: false,
                message: "등록 실패..."
                });  
        }
        return res.json({
            CreateSuccess: true,
            message: "등록 성공!"
            });  
    });
  });
//직원 관리 데이터 삭제
router.post('/delete',(req,res)=>{
  req.body.forEach(user => {
    //console.log(user.id);
    db.query(`DELETE FROM employee WHERE id = ?`,[user.id],function(error,result){
      if(error){
        throw error;
      }
    });
  });
  return res.json({
    success : true
  });
});
//직원 관리 데이터 표시
router.get('/read', (req, res) => {
    db.query('SELECT * from employee', (error, users) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      let i = 0;
      users.forEach(user => {
        //console.log(user);
        // db.query(`SELECT * from SmallCode where SmallCode=?`,[user.dept],(error,userDept)=>{
        //   if (error) throw error;
        //   console.log(userDept[0].SmallInfo);
        //   dept = userDept[0].SmallInfo;
        //   console.log('in : ',dept);
        // });
        // console.log('out : ',dept);
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
  //수정
  router.post('/update', (req, res) => {
      //console.log(req.body.name);
      const userData = req.body;
      db.query('update employee SET name =?, password=?, email=?, phone=?, zim=?, address=?, des=?, dept=?, rank=? where id=?',
        [
          userData.name, 
          userData.password, 
          userData.email, 
          userData.phone,
          userData.zim,
          userData.address,
          userData.des,
          userData.dept,
          userData.rank,
          userData.id
        ],(error,updateUserData) => {
        if(error) throw error;
        //console.log(updateUserData);
        res.json({
          CreateSuccess : true
        });
      });
    });

  module.exports = router;