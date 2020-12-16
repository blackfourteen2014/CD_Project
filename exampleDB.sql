# DB 추가
	create database mydb;
# DB 사용
	use mydb;
	USE mysql;

# 테이블 추가(임시)=========================================================
# 유저테이블
create table employee(
	id varchar(50),
	name varchar(50),
	password varchar(250),
	email varchar(50),
	phone varchar(50),
	zim varchar(50),
	address varchar(50),
	des varchar(50),
	dept varchar(50),
	rank varchar(50)
);
# 마스터코드테이블
create table MasterCode(
        LargeCode VARCHAR(3) NOT NULL,
        LargeInfo varchar(45)
    );
# 스몰코드테이블
create table SmallCode(
        SmallCode VARCHAR(6) NOT NULL,
        SmallInfo varchar(45),
        SmallContent varchar(45)
    );
# 휴일설정테이블
create table Holiday(
        StartDate VARCHAR(25) NOT NULL,
        HoliManage VARCHAR(6),
        HoliContent VARCHAR(50)
    );
# 근무조회
create table employeeWork(
		id VARCHAR(50),
        Date VARCHAR(12) NOT NULL ,
        OnWork VARCHAR(6),
        OffWork VARCHAR(6),
        WorkContent VARCHAR(50),
        OverWorkContent VARCHAR(50)
    );
#연가 테이블(임시)
create table HolidayUser(
		id varchar(5),
        StartDate VARCHAR(15) NOT NULL,
        EndDate varchar(15) NOT NULL,
        SelectedLeave varchar(15),
        Des varchar(30),
        confirmYN varchar(10)
    );
# 업무조회 테이블(임시)
create table WorkManage(
		sendId varchar(5),
        getId varchar(5),
        startDate VARCHAR(15),
        endDate varchar(15),
        title varchar(50),
        workDes varchar(1000)
    );
#==============================================================================

# 세이프 모드를 품(삭제 및 수정 가능(임시))
set sql_safe_updates=0;

# 테이블 삭제=====================================================================
	DROP TABLE Holiday; #휴일
	DROP TABLE SmallCode; #스몰코드
	DROP TABLE employeeWork; #근무조회
	DROP TABLE HolidayUser; #연가
    DROP TABLE MasterCode; #마스터코드
    DROP TABLE WorkManage; #업무조회
    DROP TABLE leaveuser; #예전 연가(삭제바람)
#==============================================================================

# 테이블 수정=====================================================================
#스몰 코드 테이블
    alter table employee modify password varchar(250);
#==============================================================================

# 데이터 넣기(임시 데이터)===================================================================================================
# 유저
	# 대표
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1110','대표임','123','test@test.com','010-0000-0000','11111','춘천시','-','영업부','대표');
    # 직원
    INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1111','직원일','123','test1@test.com','010-0000-0001','11111','춘천시','-','영업부','직원');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1112','직원이','123','test2@test.com','010-0000-0002','11111','홍천군','-','총리부','직원');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1113','직원삼','123','test3@test.com','010-0000-0003','11111','서울시','-','인사부','직원');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1114','직원사','123','test4@test.com','010-0000-0004','11111','홍천군','-','총리부','직원');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1115','직원오','123','test5@test.com','010-0000-0005','11111','서울시','-','인사부','직원');
# 마스터코드
	INSERT INTO mastercode (LargeCode,LargeInfo) VALUES('HC','holidayCode');
# 스몰코드 (수정 필요)
	INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC001','회사창립일');
	INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC002','법정공휴일');
# 휴일설정
	INSERT INTO Holiday (StartDate,holimanage,holicontent) VALUES('2020-11-11T15:00:00.000Z','HC001','test');
	INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-19','HC002','test2');
# 근무조회
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/28','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/28','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/28','10:00','18:00','1113');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/28','10:00','18:00','1114');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/28','10:00','18:00','1115');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1113');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1114');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1115');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/29','10:00','18:00','1115'); #차이를 두기 위해 활용
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/30','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/30','10:00','18:00','1112');
# 연가
	INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES('1111','2020/12/01','2020/12/03','연가','-','승인대기');
	INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES('1112','2020/12/02','2020/12/04','병가','-','승인대기');
	INSERT INTO HolidayUser (id,StartDate,EndDate,SelectedLeave,Des,confirmYN) VALUES('1113','2020/12/12','2020/12/15','공가','-','승인대기');
# 업무조회
	INSERT INTO WorkManage(sendId,getId,startDate,endDate,title,workDes) VALUES('1112','1113','2020/11/18','2020/11/20','Test','TestDes');
#=======================================================================================================================

# 세이프 모드를 품(삭제 및 수정 가능(임시))
set sql_safe_updates=0;

# 데이터 삭제========================================================================
# 유저
	delete from employee where id = '1113';
	delete from employee;
# 근무조회
	delete from employeeWork;
    delete from employeeWork where id='1110' AND Date='2020/11/30';
# 연가
	delete from HolidayUser;
# 스몰코드
	delete from smallcode;
# 휴일
	delete from holiday;
# 업무조회
	delete from WorkManage;
    delete from WorkManage ;
#=================================================================================

# 데이터 수정========================================================================
# 유저
	update employee SET name = "test" where email="test@test.com";
    update employee SET name =?, password=?, email=?, phone=?, zim=?, address=?, des=?, dept=?, rank=? where id='1115';
    
# 근무조회
	update employeeWork SET OffWork ='23:01',WorkContent='근무',OverWorkContent='초과근무' where id='1113' AND Date='2020/11/25';
# 스몰코드
	UPDATE SmallCode SET SmallCode = ?, SmallInfo = ?, SmallContent = ? where SmallCode = ?;
    UPDATE SmallCode SET SmallCode = 'DC-001', SmallInfo = '영업부', SmallContent = '' where SmallCode = 'DC-005';
# 연가
	UPDATE HolidayUser SET confirmYN = '승인' where id = '1111' AND startDate = '2020/12/01' AND EndDate = '2020/12/03';
    UPDATE HolidayUser SET confirmYN = ? where id = ? AND startDate = ? AND EndDate = ?;
    SELECT * from HolidayUser ORDER BY confirmYN DESC;
#==================================================================================

# 데이터 조회=========================================================================
# 유저
	SELECT * from employee;
    SELECT * from employee where id='1112';
    SELECT * from employee AS EMP 
    join SmallCode AS SC 
	ON EMP.dept = SC.SmallCode OR EMP.rank = SC.SmallCode;
	# SELECT * from employee join WorkManage on WorkManage.getId = '1113';
    SELECT * from employee where not id = '1114';
# 마스터코드
	SELECT * from MasterCode;
    SELECT * from MasterCode where LargeInfo like '%휴일%';
# 스몰코드
	SELECT * from SmallCode;
    SELECT * from smallCode where SmallInfo = '회사창립일';
    SELECT * from SmallCode where SmallCode like '%RC%';
    SELECT * from SmallCode where SmallCode like '%HC%';
    
    SELECT SC.SmallCode,SC.SmallInfo from SmallCode AS SC 
    join employee AS EMP
    ON EMP.dept = SC.SmallCode OR EMP.rank = SC.SmallCode where EMP.id = '1111';
    
    SELECT REPLACE(SmallCode, 'RC', '') FROM SmallCode where SmallCode like '%RC%';
# 휴일설정
	SELECT * from Holiday;
# 근무조회
	SELECT * from employeeWork where id='1111' and Date like '2020/11%';
    SELECT * from employeeWork;
    SELECT * from employeeWork where id='1110' AND Date='2020/11/30';
    SELECT * from employeeWork where Date = '2020/11/29';
    SELECT * from employeeWork Join employee ON employee.id = employeeWork.id where Date = '2020/11/29';
# 연가
	SELECT * from HolidayUser;
# 업무조회
	SELECT * from WorkManage;
    SELECT * from WorkManage Join employee ON employee.id = WorkManage.sendId where WorkManage.getId = '1113';
# 안먹는 코드
	SELECT holi.DATE,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;
#======================================================================================
# 근무조회 데이터
	# 2020
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/10/25','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/10/26','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/10/27','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/25','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/26','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/27','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/12/25','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/12/26','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/12/27','10:00','18:00','1111');
    # 2019
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/12/25','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/12/26','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/12/27','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/11/25','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/11/26','10:00','18:00','1111');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2019/11/27','10:00','18:00','1111');
# 근무조회 데이터 조회
	SELECT * from employeeWork where id='1111' and Date like '2020/10%';
    SELECT * from employeeWork where id=? and Date like ?;
    
# 근무조회 데이터
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/1','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/2','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/3','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/4','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/5','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/6','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/9','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/10','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/11','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/12','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/13','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/16','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/17','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/18','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/19','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/20','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/23','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/24','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/25','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/26','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/27','10:00','18:00','1111');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/30','10:00','18:00','1111');
    
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/1','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/2','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/3','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/4','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/5','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/6','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/9','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/10','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/11','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/12','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/13','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/16','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/17','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/18','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/19','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/20','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/23','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/24','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/25','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/26','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/27','10:00','18:00','1112');
    INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020/11/30','10:00','18:00','1112');
    
    SELECT * from WorkManage Join employee ON employee.id = WorkManage.sendId where WorkManage.getId = '1112' ORDER BY startDate DESC;
    