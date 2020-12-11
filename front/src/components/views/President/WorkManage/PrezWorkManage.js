import React, { useState, useEffect } from "react";
import { Layout, Table, Tabs, PageHeader } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import SideBar from '../../../../utils/SideBarPresident';
import { workManageColumn } from '../../Employee/WorkManage/WorkManageColumns'; //업무 칼럼
import WorkManageSend from '../../Employee/WorkManage/WorkManageSend'; //업무지시 페이지
import WorkManageInfo from '../../Employee/WorkManage/WorkManageInfo';
import {useDispatch} from 'react-redux';
import {WorkManageDataRead} from '../../../../_actions/user_action';

const { TabPane } = Tabs;

function PrezWorkManage(props){
  const dispatch = useDispatch();
  //업무 상세보기
  const [Visible, setVisible] = useState(false);
  const [UserData, setUserData] = useState(['']);

  const handleInformation = (value) => {
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
    //업무조회 데이터 Read
    dispatch(WorkManageDataRead())
      .then(response=>{
        setData(response.payload);
      });
  });

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