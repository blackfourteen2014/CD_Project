import React, {useState,useEffect} from 'react'
import { Layout, PageHeader, Button, Modal } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Link } from "react-router-dom";
import HolidayAdd from '../SystemAdd/HolidayAdd';
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar' ////캘린더====
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import './Calendar.scss' //scss 재정의=======================================
import SideBarSystem from '../../utils/SideBarSystem';
import {CustomToolbar} from '../../utils/CustomToolbar'; //캘린더 툴바 커스텀
import { useDispatch } from 'react-redux';
import {HolidayDataRead, HolidayDelete} from '../../_actions/system_action'; //휴일 function

const localizer = momentLocalizer(moment)
const { Content } = Layout;

function Holiday(props) {
  const dispatch = useDispatch();
  const [ListData, setListData] = useState([]);

  useEffect(() => {         
    //휴일 데이터 Read 
    dispatch(HolidayDataRead())
      .then(response => {
        setListData(response.payload);
      });   
}, []);
  //삭제 모달창 구현===================================
  const [Delvisible, setDelVisible] = useState(false);
  const showModal = (value) => {
    console.log(value);
    setDelVisible(value);
  };
  //취소 눌렀을 때
  const DelhandleCancel = () => {
    setDelVisible(false);
  };
  //ok 눌렀을 때
  const DelhandleOk = () => {
    setDelVisible(false);
    //휴일 데이터 Delete
    dispatch(HolidayDelete(Delvisible))
      .then(response => {
        if(response.payload.success) {
            window.location.reload();
        }
      }); 
  };
  //캘린더========================================
  const [Visible, setVisible] = useState(false);
  //팝업 OFF
  const handleCancel = () => {
    setVisible(false);
  }
  ///팝업 OFF
  const handleOk = () => {
    setVisible(false);
  }
  //팝업 ON
  const [StartDate, setStartDate] = useState(null); //휴일 날짜 데이터
  //휴일 날짜 데이터 SET
  const handleDateSelect = (e) => {
    //console.log(e.start);
    //console.log(moment(e.start).format('YYYY/MM/DD'));
    setStartDate(e.start);
    setVisible(true);
  }
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBarSystem DefaultKey={'1'}/>
        <Layout>
          {/* <Header > */}
          <div style={{textAlignLast:'end',background: '#fff',padding:0}}>
            <Link  to="/">
              <Button style={{marginRight:'1%' ,marginTop:'10px'}}>로그아웃</Button>   
            </Link>
          </div>
          <PageHeader
            className="site-page-header"
            title="휴일설정"
            subTitle="휴일설정 페이지"
            style={{background: '#fff'}}
          /> 
            <Content>
              <Modal
                    visible={Delvisible}
                    centered
                    onOk={DelhandleOk}
                    onCancel={DelhandleCancel}
                    width={250}
                    >
                      <p>삭제 하시겠습니까?</p>
              </Modal>
              <Calendar
                    localizer={localizer}
                    events={ListData}                
                    onSelectEvent={showModal}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800,fontSize:'20px'}}
                    views={{month: true}}
                    selectable ={true}
                    onSelectSlot = {handleDateSelect}
                    components={{
                      toolbar: CustomToolbar,
                    }}
                  />
                  
              <HolidayAdd StartDate={StartDate} Visible={Visible} handleOk={handleOk} handleCancel={handleCancel} />
              </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Holiday