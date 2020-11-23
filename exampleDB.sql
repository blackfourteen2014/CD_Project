create database mydb; #디비 만듬
use mydb; #자신이 쓸 디비

# 테이블 추가
create table employee(
        id varchar(50) unique,
        name varchar(50),
        password varchar(50),
        email varchar(50) unique,
        phone varchar(50) unique,
        zim varchar(50),
        address varchar(50),
        des varchar(50),
        dept varchar(50),
        rank varchar(50)
    );

# 테이블 삭제
DROP TABLE holiday;

# 데이터 넣기(임시 데이터)
INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1113','홍길삼','123','test3@test.com','010-0000-0003','11111','춘천시','-','영업부','과장');
INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1114','홍길사','123','test4@test.com','010-0000-0004','11111','홍천군','-','총리부','사원');
INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1115','홍길오','123','test5@test.com','010-0000-0005','11111','서울시','-','인사부','대리');

# 데이터 삭제
delete from employee where id = '1113';
delete from employee;

# 데이터 수정
update employee SET name = "test" where email="test@test.com";

# 세이프 모드를 품(삭제 및 수정 가능(임시))
set sql_safe_updates=0;

# 데이터 조회
select * from employee;
select * from SmallCode;
select * from Holiday;

# 정식이 꺼 임시 테이블 및 데이터들
#소코드 테이블
create table SmallCode(
        SmallCode VARCHAR(6) NOT NULL,
        SmallInfo varchar(45)
    );

INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC001','회사창립일');
INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC002','법정공휴일');

select * from SmallCode;
#휴일 관리 테이블
create table Holiday(
        Date VARCHAR(12) NOT NULL,
        HoliManage VARCHAR(6),
        HoliContent VARCHAR(50)
    );

    
# 안됨


INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-18','HC001','test');
INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-19','HC002','test2');

select * from holiday;

SELECT holi.DATE,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;

# 직원근무조회 연습용 create, insert, select, drop
create table worklist(
		Date VARCHAR(12),
        day VARCHAR(10)
    );
    
insert into worklist(Date, day) values('2020-11-20', '월요일');
insert into worklist(Date, day) values('2020-11-20', '화요일');
select * from worklist;
drop table worklist;

#직원근무관리 테이블 임시
create table employeeWork(
        Date VARCHAR(12) NOT NULL ,
        Time VARCHAR(6),
        id VARCHAR(50)
    );
    
INSERT INTO employeeWork (DATE,Time,id) VALUES('2020-11-18','22:00','1111');
INSERT INTO employeeWork (DATE,Time,id) VALUES('2020-11-19','22:00','1111');
INSERT INTO employeeWork (DATE,Time,id) VALUES('2020-11-18','22:00','1112');
INSERT INTO employeeWork (DATE,Time,id) VALUES('2020-11-18','22:00','1113');

delete from employeeWork;

select * from employeeWork where id='1117' and Date='2020-11-22';

select * from employeeWork;

select * from employeeWork;

<<<<<<< HEAD
=======
alter table smallcode add SmallContent varchar(100);

create table MasterCode(
        LargeCode VARCHAR(3) NOT NULL,
        LargeInfo varchar(45)
    );

INSERT INTO mastercode (LargeCode,LargeInfo) VALUES('HC','holidayCode');
>>>>>>> updateMain/main
