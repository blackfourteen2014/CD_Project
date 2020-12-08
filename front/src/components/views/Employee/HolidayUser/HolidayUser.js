import React, {useState, useEffect} from 'react';
import { Layout, Button, Table, PageHeader} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import LoginedUser from '../../../../utils/LoginedUser';//로그인 시
import LogoutUser from '../../../../utils/LogoutUser';//로그아웃 시
import SideBar from '../../../../utils/SideBarEmployee';//사이드바
import {HolidayColums} from './HolidayUserColums'; //연가조회칼럼
import HolidayUserAdd from './HolidayUserAdd';//연가신청 버튼의 기능
import { Calendar, momentLocalizer } from 'react-big-calendar'; //빅캘린더
import moment from 'moment'; //날짜 및 시간 데이터
import 'react-big-calendar/lib/sass/styles.scss'; //빅캘린더 스타일
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'; //빅캘린더 스타일2
import './Calendar.scss'; //캘린더 scss 재정의
import '../../user.css'; //css
import {CustomToolbar} from '../../../../utils/CustomToolbar'; //캘린더 툴바 커스텀
import { useDispatch } from 'react-redux';
import {HolidayDataRead} from '../../../../_actions/system_action'; //휴일 function
import {HolidayUserDataRead} from '../../../../_actions/user_action';//연가 function

const { Content } = Layout;
const localizer = momentLocalizer(moment)

function HolidayUser(props) {
  const dispatch = useDispatch();
  const [HolidayUserData, setHolidayUserData] = useState(['']); //연가 정보
  const [ListData, setListData] = useState(['']); //휴일 정보
  //휴일 데이터 Read
  const HolidayRead = () => {
    dispatch(HolidayDataRead())
            .then(response => {
              setListData(response.payload);
            }
    );
  } 
  //유저 연가 데이터 Read
  const HolidayUserRead = () => {
    dispatch(HolidayUserDataRead())
            .then(response => {
              setHolidayUserData(response.payload);
            }
    );
  }
  useEffect(() => {         
    HolidayRead();
    HolidayUserRead();
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
