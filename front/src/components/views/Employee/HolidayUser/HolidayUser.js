import React, {useState, useEffect} from 'react'
import { Layout, Button, Table, PageHeader} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';///utils 폴더
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarEmployee';///여기까지
import {HolidayColums} from './HolidayUserColums'; //연가조회칼럼
import HolidayUserAdd from './HolidayUserAdd';//연가신청 버튼의 기능
import { Calendar, momentLocalizer } from 'react-big-calendar' //캘린더============
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import './Calendar.scss' //scss 재정의=============================================
import '../../user.css';

const { Header, Content } = Layout;
const localizer = momentLocalizer(moment)

function HolidayUser(props) {
  const [HolidayUserData, setHolidayUserData] = useState(''); //연가 정보
  const [ListData, setListData] = useState([]); //휴일 정보

  useEffect(() => {         
    //휴일 데이터를 가져옴
    axios.get('/api/holidaydataread').then(response => {
      //console.log(response.data);
      setListData(response.data);
    });
    //HolidayUser
    axios.get('/api/users/holidayuserdataread').then(response => {
      setHolidayUserData(response.data);
    });
}, []);
  //캘린더====================================================================================
  const [Visible, setVisible] = useState(false);
  //팝업 ON
  const showModal = () => {
    setVisible(true);
  };
  //팝업 OFF
  const handleCancel = () => {
    setVisible(false);
  };
  //팝업 OFF 및 데이터 보내기
  const handleOk = () => {
    setVisible(false);
  }
  //커스텀 툴바
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
  //===========================================================================================================
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
                <div>
                  <Table columns={HolidayColums} dataSource={HolidayUserData} pagination={false} />
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
    );
}

export default HolidayUser
