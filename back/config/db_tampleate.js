const mysql = require("mysql"); //mysql 모듈을 가져옴
//db.js 파일을 만든 뒤 아래 정보 입력
var db = mysql.createConnection({
  host: "", //ex> localhost
  user: "", //ex> root
  password: "", // ex> 1234
  database: "", //ex>mydb
});

db.connect();
module.exports = db;
