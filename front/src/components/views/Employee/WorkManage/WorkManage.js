import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Layout, Table, Tabs, PageHeader } from 'antd';
import LoginedUser from '../../../../utils/LoginedUser';////utils
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarEmployee';///여기까지
import { workManageColumn } from './WorkManageColumns'; //업무 칼럼
import WorkManageSend from './WorkManageSend'; //업무지시 페이지
import WorkManageInfo from './WorkManageInfo';
import '../../user.css';
import {useDispatch} from 'react-redux';
import {WorkManageDataRead} from '../../../../_actions/user_action';

const { TabPane } = Tabs;

  function WorkManage(props) {
    const dispatch = useDispatch();
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
    const [Data, setData] = useState(['']); //업무조회 데이터 변수
    
    useEffect(() => {
      //업무조회 데이터 Read
      dispatch(WorkManageDataRead())
        .then(response=>{
          setData(response.payload);
        });
    }, []);
      return (
          <Layout>
            <SideBar DefaultKey={'3'}/>
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

export default WorkManage