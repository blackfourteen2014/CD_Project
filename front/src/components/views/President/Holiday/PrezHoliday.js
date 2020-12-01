import React, { useState, useEffect } from "react";
import { Layout, Button, Table, PageHeader } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import HolidayUserAdd from '../../Employee/HolidayUser/HolidayUserAdd';
//import PrezHoliConfirm from './PrezHoliConfim';
import { Calendar, momentLocalizer } from 'react-big-calendar' //캘린더============
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import './Calendar.scss' //scss 재정의=============================================
import { prezHoliColumns } from './PrezHoliColumns';

const { Header, Content } = Layout;
const localizer = momentLocalizer(moment)

function PrezHoli(props){
  const [HolidayUserData, setHolidayUserData] = useState(''); //날짜 정보
  const [ListData, setListData] = useState([]); //휴일 정보

  useEffect(() => {         
    //휴일 데이터를 가져옴
    axios.get('/api/holidaydataread').then(response => {
      //console.log(response.data);
      setListData(response.data);
    });
    axios.get('/api/holidayprezuserlist').then(response => {
      setHolidayUserData(response.data);
    });
}, []);
  
    const [Visible, setVisible] = useState(false);
    //const [ConfirmVisible, ConfirmsetVisible] = useState(false);//confirm modal창 state
    //팝업 ON
    const showModal = () => {
        setVisible(true);
    };
    // const showConfirm = () => {
    //   ConfirmsetVisible(true);
    // };
    //팝업 OFF
    const handleCancel = () => {
        setVisible(false);
        //ConfirmsetVisible(false);
    };
    //팝업 OFF 및 데이터 보내기
    const handleOk = () => {
        setVisible(false);
        //ConfirmsetVisible(false);
    }
    //커스텀 툴바==========================================================================
    const CustomToolbar = (toolbar) => {
      //이전 달 버튼 이벤트
      const goToBack = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1);
        toolbar.onNavigate('prev');
      };
      //다음 달 버튼 이벤트
      const goToNext = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1);
        toolbar.onNavigate('next');
      };
      // Today버튼 이벤트
      const goToCurrent = () => {
        const now = new Date();
        toolbar.date.setMonth(now.getMonth());
        toolbar.date.setYear(now.getFullYear());
        toolbar.onNavigate('current');
      };
      //label ex)11 2020
      const label = () => {
        const date = moment(toolbar.date);
        return (
          <span><b>{date.format('MM')}</b><span style={{fontSize:'20px'}}> {date.format('YYYY')}</span></span>
        );
      };
    
      return (
        <div className={Calendar['toolbar-container']}>
          <label className={Calendar['label-date']} style={{fontSize:'30px'}}>{label()}</label>
    
          <div className={Calendar['back-next-buttons']}>
            <Button className={Calendar['btn-back']} onClick={goToBack}>&#8249;</Button>
            <Button className={Calendar['btn-current']} onClick={goToCurrent}>Today</Button>
            <Button className={Calendar['btn-next']} onClick={goToNext}>&#8250;</Button>
          </div>
        </div >
      );
    };
  //=========================================================================================================
  //선택 창
  const [CheckTarget, setCheckTarget] = useState(['']);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };
    //연가 승인 버튼
    const handleConfirm = () => {
      axios.post('/api/holidayuserconfirm',CheckTarget).then( response =>{
        console.log(response.data.success);
        if(response.data.success){
          alert('승인되었습니다.');
          window.location.reload();
        }
      });
    }
    return(
        <div>
        <Layout>
          <SideBar DefaultKey={'2'}/>
          <Layout>
            <div style={{textAlignLast:'end',background: '#fff',padding: '10px' }}>
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </div>
            <PageHeader
              className="site-page-header"
              title="연가"
              subTitle="연가신청 페이지"
              style={{backgroundColor:'#fff'}}
            />
            <Content>
              {/* 캘린더 */}
              <Calendar
                  className = "cal"
                  localizer={localizer}
                  events={ListData}
                  startAccessor="start"
                  endAccessor="end"
                  views={{month: true}}
                  components={{
                    toolbar: CustomToolbar,
                  }}
                />
              <Button className = "btn" onClick = {showModal}>연가신청</Button>
              <HolidayUserAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
              <Button className = "btn" onClick = {handleConfirm}>연가승인</Button>
              {/* <PrezHoliConfirm Visible={ConfirmVisible} handleCancel={handleCancel} handleOk={handleOk} /> */}
              <Table 
              columns={prezHoliColumns} 
              dataSource={HolidayUserData} 
              //pagination={false} 
              rowSelection={rowSelection}/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
}

export default PrezHoli