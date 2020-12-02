import React, { useState,useEffect } from "react";
import { Layout, Button, Table, Select, DatePicker, PageHeader } from 'antd';
import 'antd/dist/antd.css';
import SideBar from '../../../../utils/SideBarPresident';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import EmployeeManageInfo from "./EmployeeManageInfo";
import {EmployeeManageColum} from './EmployeeManageColums';
import moment from 'moment';
import axios from 'axios';

const { Content } = Layout;
const { Option } = Select;

function EmployeeManage(props){
    //검색창 선택한 부서 값
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
     //근무부서 선택
//const [data, setData] = useState([]);//칼럼 안 데이터
const [DeptList, setDeptList] = useState(['']); //부서검색
function onSelectChange(value) {
  console.log(value);
  if(value === 'All'){
    axios.post('/api/employeemanageuserlist',SaveDate).then(response => {   
      setUserList(response.data);
    });
    console.log(value);
  }else{
    console.log(value);
    let body = {
      SmallInfo : value,
      SaveDate : SaveDate[0]
    }
    axios.post('/api/employeeworkdeptcodelist',body).then(response => {  
      console.log(response.data);
      setUserList(response.data);
    });
  }
}
    //직원근무조회
    const CurrentDate = useState(moment().format('YYYY/MM/DD')); //현재 날짜
    const [UserList, setUserList] = useState(['']);//직원근무조회 유저 데이터 변수
    const [SaveDate, setSaveDate] = useState(CurrentDate); //보낼 데이터
    const [SelectYear, setSelectYear] = useState('');
    const [SelectMonth, setSelectMonth] = useState('');
    //직원근무조회 유저 데이터 GET
    useEffect(() => {
      axios.post('/api/employeemanageuserlist',CurrentDate).then(response => {
        setUserList(response.data);
      });
      axios.get('/api/deptlist').then(response => {
        setDeptList(response.data);
      });
    }, []);
    //데이터 피커 창에서 날짜 선택 시
    const handleChangeDate = (e) => {
      if(e != null){
        const SelectedDate = [e.format('YYYY/MM/DD')]; //선택한 날짜
        setSaveDate(SelectedDate); //직원 리스트에서 직원 선택 시 보여줄 월
        setSelectYear(e.format('YYYY')); //년도
        setSelectMonth(e.format('MM')); //월
        axios.post('/api/employeemanageuserlist',SelectedDate).then(response => {
          setUserList(response.data);
        });
      }
    }
    //해당 직원 월별 근무 조회
    const [Visible, setVisible] = useState(false); //팝업 창 변수
    const [UserData, setUserData] = useState(''); //받아온 유저 데이터 변수
    const [WorkTimeSum, setWorkTimeSum] = useState(0); //총 근무시간 데이터 변수
    const [User, setUser] = useState(['']);
    //직원 월별 근무 조회 GET
    const handleWorkInformation = (value) => {
      //보낼 데이터
      const sendData = {
        UserID : value.id,
        SaveDate : SaveDate[0]
      };
      axios.post('/api/employeemanageusermonthlylist',sendData).then(response => {
        setUserData(response.data.userList); //받아온 유저 데이터
        setWorkTimeSum(response.data.userWorkTimeSum); //총 근무시간 데이터
    });
      setUser(value);
      setVisible(true);
    }
    //팝업 OFF
    const handleOk = () => {
      setVisible(false);
    }
    //팝업 OFF
    const handleCancel = () => {
      setVisible(false);
    }

    return(
        <div>
        <Layout style={{ minHeight: '100vh' }}>
          <SideBar DefaultKey={'3'}/>
          <Layout>
            <div style={{textAlignLast:'end',background: '#fff',padding: '10px' }}>
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </div>
            <PageHeader
              className="site-page-header"
              title="직원근무조회"
              subTitle="직원근무조회 페이지"
              style={{backgroundColor:'#fff'}}
            />
            <Content style={{ margin: '0 auto', width: '100%'}}>
              <div>
                  <div>
                      <div style = {{display: "inline-block"}}>
                          <Button disabled style = {{backgroundColor: "orange", color: "black"}}>부서선택</Button> 
                      </div>
                      <div style = {{display: "inline-block"}}>
                        <Select showSearch style={{ width: 200 }} placeholder="근무부서 검색"
                        onChange={onSelectChange}
                        >
                          <Option key={'All'}>All</Option>
                          {DeptList.map(code => (
                          <Option key={code.SmallInfo}>{code.SmallInfo}</Option>
                          ))}
                          </Select>
                      </div>
                      <div style = {{display: "inline-block", marginLeft: "20%"}}>
                        <DatePicker 
                          onChange={handleChangeDate}
                          defaultValue={moment(CurrentDate[0],'YYYY/MM/DD')}
                          format="YYYY/MM/DD"
                          style = {{width: "300px"}}/>
                      </div>
                  </div>
                  <div>
                      <Table columns={EmployeeManageColum} dataSource={UserList} pagination={false}
                        onRow={(record) => ({onClick: () => { handleWorkInformation(record) }})}/>
                      {Visible ? 
                      <EmployeeManageInfo 
                        Visible={Visible} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel} 
                        UserData={UserData} 
                        WorkTimeSum={WorkTimeSum} 
                        SelectYear={SelectYear}
                        SelectMonth={SelectMonth}
                        User={User}
                        />:null}
                      
                  </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default EmployeeManage