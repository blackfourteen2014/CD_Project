(배우는 과정이여서 미흡한 부분이 많습니다. 배우면서 계속 업데이트할 예정입니다.)
# 개발 도구
- CodeEditer : VS Code
- Front-End : React
- UI-Design : Ant Design
- Back-End : Nodejs
- Nodejs-FrameWork : Express
- DataBase : MySQL(server 5.7)
- 소스 관리 및 공유 : Git, GitHub

# 사용 설명
## 실행 방법(CD_Project부터 시작하면 됩니다.)
### 사용할 모듈 다운로드
```
cd front -> npm install
//다시 뒤로 cd  ..
cd back -> npm install
```
### 실행 전 설정
```
[backend - DB 연결]
back/config 에 있는 db_tamplate.js와 sessionDB.template.js
파일을 복사하여 db.js, sessionDB.js로 만든 뒤 자신의 DB(mysql)정보를 입력합니다.

[DB 테이블 Create]
exampleDB.sql에 있는 테이블들을 만들어줍니다.
(스키마가 UTF-8인 상태에서 만들어야 합니다. 참조 : https://lazymankook.tistory.com/70)
```
### 실행(CD_Project에서 시작)
```
cd back -> npm run start
//다시 뒤로 cd ..
cd front -> npm run start
//로그인 페이지가 뜨면 성공입니다.
//root로 로그인하셔서 공통코드 및 직원관리를 사용하여 직원 및 대표로 로그인해보세요.
```

# 추가적인 설명

- (front)

<img src='./images/front_description.PNG'  style="float: left;" hspace='5px' width='170px'> 

```




=> _actions : 액션이 일어날 때 axios로 서버에 보낼 주소를 관리
=> _reducers : redux를 사용해 state값을 관리(좀 더 연습 필요)
=> components\views : 로그인, 직원, 대표에서 쓰는 페이지를 모아놈




=> hoc : 시스템관리자에서 쓰는 페이지를 모아놈
=> utils : 여러 곳에서 사용되는 컴포넌트를 모아놈

=> App.js : 페이지 주소를 관리하는 곳





=> setupProxy.js : 서버로 보낼 때 해당 주소로 변환하여 보냄







```

- (back)

<img src='./images/back_description.PNG'  style="float: left;" hspace='5px'> 

```
=> config : db 연결과 관련된 파일들






=> lib : 시스템과 유저, 로그인 기능들을 모아놓음





=> index.js : 필요한 모듈 및 lib에 있는 기능들로 정확하게 도달 될 수 있도록 해줌(router)
```

# 사용하며 알아두면 좋은 것
- React_Hook(참고 : https://ko.reactjs.org/docs/hooks-intro.html)

- React_Redux(좀 더 공부가 필요함)(참고: https://react-redux.js.org/introduction/basic-tutorial)

- Express(참고 : https://expressjs.com/ko/guide/routing.html)

- AntDesign(참고 : https://ant.design/components/overview/)