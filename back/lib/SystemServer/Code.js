const express = require('express');
const router = express.Router();
const db = require('../../config/db');
//대코드 create
router.post('/mastercodecreate', (req, res) => {
    db.query(`INSERT INTO mastercode(LargeCode,LargeInfo) VALUES(?,?)`,
    [req.body.LargeCode, req.body.LargeInfo],(error,result) => {
      if(error) {
        return  res.json({
          largecodeSaveSuccess: false,
            message: "실패"
            });  
    }
    return res.json({
      largecodeSaveSuccess: true,
        message: "성공" 
        });  
  });
  });
//대코드 Read
router.get('/mastercoderead', (req, res) => {
    db.query('SELECT * from MasterCode', (error, rows) => {
      if (error) throw error;
      let temp = [];
      let data = {};
      let i = 0;
     rows.forEach(row => {
     data = {
            key: String(i+1),
            LargeCode: row.LargeCode,
            LargeInfo: row.LargeInfo,
    }
        i++;
        temp.push(data);
      });
      res.send(temp);
  
  });
    });
//대코드 Delete
router.post('/mastercodedelete',(req,res)=>{
    req.body.forEach(user => {
      //console.log(user.id);
      db.query(`DELETE FROM mastercode WHERE LargeCode = ?`,[user.LargeCode],function(error,result){
        if(error){
          throw error;
        }
      });
    });
    return res.json({
      success : true
    });
  });
//시스템. 소코드 페이지에서 대코드 리스트 검색 창 Read
router.post('/mastercodesearchlistread', (req,res) => {
    db.query('SELECT * from MasterCode where LargeCode like ?',[`%${req.body.LargeCode}%`],(error,data)=>{
      if(error) res.send(['']);
      db.query('SELECT * from SmallCode where SmallCode like ?',[`%${data[0].LargeCode}%`],(error2,rows)=>{
        if (error2) throw error2;
        let sendData = [];
        let data = {};
        let key = 0;
       rows.forEach(row => {
       data = {
              key: String(key+1),
              SmallCode: row.SmallCode,
              SmallInfo: row.SmallInfo,
              SmallContent: row.SmallContent
            }
          key++;
          sendData.push(data);
        });
        res.send(sendData);
      });
    });
  });
//소코드 read
router.get('/smallcoderead', (req, res) => {
    db.query('SELECT * from SmallCode', (error, rows) => {
      if (error) throw error;
      let sendData = [];
      let data = {};
      let key = 0;
     rows.forEach(row => {
     data = {
            key: String(key+1),
            SmallCode: row.SmallCode,
            SmallInfo: row.SmallInfo,
            SmallContent: row.SmallContent
          }
        key++;
        sendData.push(data);
      });
      res.send(sendData);
    });
  });
//소코드 Create
router.post('/smallcodecreate', (req, res) => {
    const code = req.body.LargeCode + req.body.SmallCode;
    db.query(`INSERT INTO smallcode(SmallCode,SmallInfo,SmallContent) VALUES(?,?,?)`,
    [code, req.body.SmallInfo,req.body.SmallContent],(error,result) => {
      if(error) {
        return  res.json({
          smallcodeSaveSuccess: false,
            message: "실패"
            });  
    }
    return res.json({
      smallcodeSaveSuccess: true,
        message: "성공" 
        });  
  });
  });
//소코드 Delete
router.post('/smallcodedelete',(req,res)=>{
    req.body.forEach(user => {
      db.query(`DELETE FROM smallcode WHERE SmallCode = ?`,[user.SmallCode],function(error,result){
        if(error){
          throw error;
        }
      });
    });
    return res.json({
      success : true
    });
  });

module.exports = router;