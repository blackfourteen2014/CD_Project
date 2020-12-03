const express = require('express');
const router = express.Router();
const db = require('../../config/db');

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

  app.post('/api/mastercodedelete',(req,res)=>{
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