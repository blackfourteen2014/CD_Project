create database mydb; #디비 만듬
use mydb; #자신이 쓸 디비

# 테이블 추가
create table employee(
	id varchar(50),
	name varchar(50),
	password varchar(50),
	email varchar(50),
	phone varchar(50),
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
create table SmallCode(
        SmallCode VARCHAR(6) NOT NULL,
        SmallInfo varchar(45)
    );

INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC001','회사창립일');
INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC002','법정공휴일');

create table Holiday(
        Date VARCHAR(12) NOT NULL,
        HoliManage VARCHAR(6),
        HoliContent VARCHAR(50)
    );
    
# 안됨
INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-18','HC001','test');
INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-19','HC002','test2');

select * from holiday;
select * from SmallCode;

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

create table employeeWork(
		id VARCHAR(50),
        Date VARCHAR(12) NOT NULL ,
        OnWork VARCHAR(6),
        OffWork VARCHAR(6),
        WorkContent VARCHAR(50),
        OverWorkContent VARCHAR(50)
    );

DROP TABLE employeeWork;
    
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-25','10:00','18:00','1114');
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-26','10:00','18:00','1114');
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-27','10:00','18:00','1114');
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-28','10:00','18:00','1114');
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-29','10:00','18:00','1114');
INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-30','10:00','18:00','1114');

delete from employeeWork;

select * from employeeWork where id='1117' and Date='2020-11-22';

select * from employeeWork;

update employeeWork SET OffWork ='23:01',WorkContent='근무',OverWorkContent='초과근무' where id='1113' AND Date='2020/11/25';

#스몰 코드 테이블
alter table smallcode add SmallContent varchar(100);

create table MasterCode(
        LargeCode VARCHAR(3) NOT NULL,
        LargeInfo varchar(45)
    );

INSERT INTO mastercode (LargeCode,LargeInfo) VALUES('HC','holidayCode');

select * from smallCode where SmallInfo = '회사창립일';
#연가 테이블(임시)
create table LeaveUser(
		id varchar(5),
        StartDate VARCHAR(15) NOT NULL,
        EndDate varchar(15) NOT NULL,
        SelectedLeave varchar(15),
        Des varchar(30)
    );

DROP TABLE LeaveUser;
delete from LeaveUser;

INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-22','2020-11-25','연가','-');
INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-02','2020-11-05','병가','-');
INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-12','2020-11-15','공가','-');

select * from LeaveUser;

SELECT * from employeeWork where id='1113' AND Date='2020/11/25';
