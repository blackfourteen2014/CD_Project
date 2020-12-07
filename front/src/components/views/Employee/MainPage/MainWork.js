import React, { useState, useEffect } from "react";
import { Button, Table, Select, Layout} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {MainColumn} from './MainColumns'; //칼럼
import '../../user.css';
import moment from 'moment';

const { Option } = Select;
const { Content } = Layout;
//인쇄 기능
const printDiv = () => {
  var initBody = document.body.innerHTML;

  window.onbeforeprint = function(){
    //document.title = LoginedUser;
    document.body.innerHTML = document.getElementById('printArea').innerHTML;
  }
  window.onafterprint = function(){
    document.body.innerHTML = initBody;
    window.location.reload();
  }
  window.print();
}

function MainWork(){
  const [data, setData] = useState([]); //근무 데이터
  const [WorkTimeSum, setWorkTimeSum] = useState(0);
  //나중엔 서버에서 작업해서 넘겨주는 방식으로 구현
  const years = ['2020','2019','2018','2017','2016'];
  const months = ['1','2','3','4','5','6','7','8','9','10','11','12']
  //근무 조회
  useEffect(() => {
    let body = {
      CurrentYear,
      CurrentMonth
    }
    axios.post('/api/users/mainworkread',body).then(response => {
      //console.log(response.data);
      setData(response.data.workList);
      setWorkTimeSum(response.data.workTimeSum);
    });
  }, []);
  //선택한 년도,월로 데이터 바꾸기
  const [CurrentYear, setCurrentYear] = useState(moment().format("YYYY")); //년도
  const [CurrentMonth, setCurrentMonth] = useState(moment().format("MM")); //월
  //년도 바꿈
  const ChangeYear = (value) => {
    //console.log(value);
    setCurrentYear(value);
    const Year = value;
    let body = {
      CurrentYear : Year,
      CurrentMonth
    }
    axios.post('/api/users/mainworkread',body).then(response => {
      //console.log(response.data);
      setData(response.data.workList);
      setWorkTimeSum(response.data.workTimeSum);
    });
  }
  //월 바꿈
  const ChangeMonth = (value) => {
    //console.log(value);
    setCurrentMonth(value);
    const Month = value;
    let body = {
      CurrentYear,
      CurrentMonth : Month
    }
    axios.post('/api/users/mainworkread',body).then(response => {
      //console.log(response.data);
      setData(response.data.workList);
      setWorkTimeSum(response.data.workTimeSum);
    });
  }

  return(
  <>
    <Content>
      <div id = "mainwrap">
        <div id = "mainheader">{/* 년 월 인쇄 통합 div */}
          <div id = "dateheader">
            <Select name = 'year' defaultValue="년도" onChange={ChangeYear} className = "selectyear">
              {years.map(year => (
                <Option key={year}>{year}</Option>
              ))}
            </Select>
            <Select name = 'month' defaultValue="월" onChange={ChangeMonth} className = "selectmonth">
              {months.map(month => (
                <Option key={month}>{month}</Option>
              ))}
            </Select>
          </div>
          <div id = "printheader">
            <Button onClick = {printDiv}>인쇄</Button>
          </div>
        </div>
        <div id = "printArea">
          <div id = "printtitle">
            <h2>{CurrentYear}년 {CurrentMonth}월 근무현황</h2>
          </div>

          <Table columns={MainColumn} dataSource={data} pagination={false} />

          <div className = "worktimeleft">
            근무시간합계
          </div>
          <div className = "worktimeright">
            {WorkTimeSum}
          </div>
          <div className = "worktimeleft">
            초과근무시간합계
          </div>
          <div className = "worktimeright">
            초과합
          </div>
        </div>
      </div>
    </Content>
  </>
  );
}

export default MainWork
