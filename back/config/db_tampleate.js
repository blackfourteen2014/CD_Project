const mysql = require('mysql');//mysql 모듈을 가져옴
//db.js 파일을 만든 뒤 내용을 복사하여 자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
var db = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

db.connect();
module.exports = db;