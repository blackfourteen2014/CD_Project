import React, {useState, useEffect} from 'react'; //리액트
import { Layout, Menu, Button, Row, Col} from 'antd'; //antd디자인
import 'antd/dist/antd.css'; //antd디자인 CSS
import moment from 'moment'; //시간과 날짜
import LiveClock from './LiveClock'; //시계
import OnWork from './OnWork'; //출근 기능
import OffWork from './OffWork'; //퇴근 기능
import { Link } from "react-router-dom"; //라우터

const { Sider } = Layout;

function SideBar(props) {
  //변수
  const [Date, setDate] = useState(''); //날짜 변수
  const [Time, setTime] = useState(''); //시간 변수

  useEffect(() => {
    //메인 페이지 들어오면 우선 그 시간으로 시간 초기화(오류방지)
    setDate(moment().format('YYYY/MM/DD')); //현재 날짜
    setTime(moment().format('hh:mm'));//현재 시각
  }, []);
////////////////////////////////////////////////////////출근 버튼 연동
  const [OnVisible, setOnVisible] = useState(false);
  //팝업 창 ON / 시간 설정
  const handleOnWork = () => {
    setOnVisible(true);
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm'));
  };
  //팝업 창 OFF
  const handleOnOk = () => {
    setOnVisible(false);
  }
  ////////////////////////////////////////////////////////퇴근 버튼 연동
  const [OffVisible, setOffVisible] = useState(false);

  const handleOffWork = () => {
    setOffVisible(true);
    setDate(moment().format('YYYY/MM/DD'));
    setTime(moment().format('hh:mm'));
  }
  const handleOffOk = () => {
    setOffVisible(false);
  }
    return (
        <>
          <Sider style={{background:'dark'}}>
            <div>
            <LiveClock />
            </div>
            <Row>
                <Col span={12}><Button block onClick={handleOnWork}>출근</Button></Col>
                <Col span={12}><Button block onClick={handleOffWork}>퇴근</Button></Col>
            </Row>
            <OnWork OnVisible={OnVisible} Date={Date} Time={Time} handleOnOk={handleOnOk} />
            <OffWork OffVisible={OffVisible} Date={Date} Time={Time} handleOffOk={handleOffOk} />
              <Menu theme="dark" defaultSelectedKeys={props.DefaultKey} mode="inline">
                <Menu.Item key="1" >
                  <span>홈 바로가기</span>
                  <Link to="/main" />
                </Menu.Item>
                <Menu.Item key="2" >
                  <span>연가</span>
                  <Link to="/holidayuser" />
                </Menu.Item>
                <Menu.Item key="3" >
                  <span>업무지시 및 조회</span>
                  <Link to="/workmanage" />
                </Menu.Item>
                <Menu.Item key="4" >
                  <span>마이 페이지</span>
                  <Link to="/ckmypage" />
                </Menu.Item>
              </Menu>
          </Sider>
        </>
    )
}

export default SideBar
