import React, { useState, useEffect } from "react";
import { Layout, Table, Tabs, PageHeader } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import { workManageColumn } from '../../Employee/WorkManage/WorkManageColumns'; //업무 칼럼
import WorkManageSend from '../../Employee/WorkManage/WorkManageSend'; //업무지시 페이지
import WorkManageInfo from '../../Employee/WorkManage/WorkManageInfo';

const { Header } = Layout; //Layout부분을  Header , Content ,Sider, Footer로 나눠서 사용한다.
const { TabPane } = Tabs;

function PrezWorkManage(props){
  const [SendShow, setSendShow] = useState(false); //스위치버튼

    //업무조회 페이지로
    const handleListShow = (e) => {
      //console.log(e);
      setSendShow(false);
    }
    //업무지시 페이지로
    const handleSendShow = (e) => {
      console.log(e);
      setSendShow(true);
    }
    //업무 상세보기
    const [Visible, setVisible] = useState(false);
    const [UserData, setUserData] = useState(['']);

    const handleInformation = (value) => {
      //console.log(value);
      setUserData(value);
      setVisible(true);
    }

    const handleOk = () => {
      setVisible(false);
    }

    const handleCancel = () => {
      setVisible(false);
    }
    //업무 조회 데이터 가져오기
    const [Data, setData] = useState(['']);

    useEffect(() => {
      axios.get('/api/workmanageread').then(response => {
        console.log(response.data);
        setData(response.data);
      }); 
    }, []);

    return(
        <Layout>
          <SideBar DefaultKey={'4'}/>
          <Layout>
            <div style={{textAlignLast:'end',background: '#fff',padding: '10px' }}>
              <LoginedUser />
              <LogoutUser pageChange={props}/>
            </div>
            <PageHeader
              className="site-page-header"
              title="업무지시 및 조회"
              subTitle="업무지시 및 조회 페이지"
              style={{backgroundColor:'#fff'}}
            />
            <div className = "managecontent">
                <Tabs defaultActiveKey="1" type={'card'} tabBarStyle={{backgroundColor:'white'}}>
                  <TabPane tab="업무조회" key="1">  
                    <Table columns={workManageColumn} dataSource={Data} pagination={false} 
                    onRow={(record) => ({onClick: () => { handleInformation(record); }})} />
                  </TabPane>
                  <TabPane tab="업무지시" key="2">
                    <WorkManageSend />
                  </TabPane>
                </Tabs>
                <WorkManageInfo 
                  Visible={Visible} 
                  UserData={UserData} 
                  handleOk={handleOk} 
                  handleCancel={handleCancel} 
                />
              </div>
          </Layout>
        </Layout>
    );
}

export default PrezWorkManage