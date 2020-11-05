const express = require('express'); //express 모듈을 가져옴
const db   = require('./config/db'); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
const app = express(); //funtion을 이용하여 새로운 express app을 만듬
const port = 5000 //port number
const bodyParser = require('body-parser');
const UserRouter = require('./lib/User'); //User 모듈을 가져옴
//웹에서 application/x-www-form-urlencoded에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended : true}));
//웹에서 application/json에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.json());

//get 가져오는 것. '/'는 주소를 뜻한다. 현재 '/'에 아무것도 안붙으므로 root directory를 뜻한다.
//req => request(요청), res=> response(응답)
app.get('/', (req, res) => {
  res.send('Root => Hello World!/안녕하세요!!!')
})
//위와 마찬가지. 다만, /users에 연결되어 있다
app.get('/users', (req, res) => {
  db.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('mysql Connected...');
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
//axios 연습(해당 주소로 가면 볼 수 있음)
app.get('/api/hello',(req,res)=>{
  res.send('안녕하세요~');
});
//페이지의 복잡성을 해소하기 위한 라우터
app.use('/api/users', UserRouter);

//port number를 콘솔에 출력
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
