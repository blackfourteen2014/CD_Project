import React, {useState,useEffect} from 'react'
import { Select,Layout, PageHeader,Table, Button, Tabs, Breadcrumb} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import { Link } from "react-router-dom";
import CodeAdd from '../SystemAdd/SmallCodeAdd';
import MasterCode from './MasterCode';
//import CodeUpdate from '../SystemUpdate/SmallCodeUpdate';
import {CodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
import SideBarSystem from '../../utils/SideBarSystem';
// import SmallCodeUpdate from '../SystemUpdate/SmallCodeUpdate';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function Code() {
  const [SmallCode, setSmallCode] = useState(['']);//칼럼 안 데이터
  const [Masterdata, setMasterData] = useState(['']);//칼럼 안 데이터
  const { Option } = Select;
  const [Visible, setVisible] = useState(false); //modal 관리
  const [CheckTarget, setCheckTarget] = useState(['']); //체크 박스 한 대상
  //체크박스
 const rowSelection = {
   onChange: (selectedRowKeys, selectedRows) => {
     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
     setCheckTarget(selectedRows);
   }
 };
  //delete
 const handleDelete = () => {
   axios.post('/api/SmallCodedelete', CheckTarget).then(res =>{
    if(res.data.success){
    alert('삭제되었습니다.');
    window.location.reload();
     }
   })
 }
  //mastercodeadd 분리
  //팝업 창 ON
  const showModal = () => {
    setVisible(true);
  }
  //팝업 창 OFF
  const handleCancel = () =>{
    setVisible(false);
  }
  //팝업 창 OFF
  const handleOk = () =>{
    setVisible(false);
  }
  //대코드 종류선택
  function onChange(value) {
    if(value === 'All'){
      axios.get('/api/smallcoderead').then(response => {  
        setSmallCode(response.data);
      });
    }
     else{
      let body = {
      LargeCode : value
       }
     axios.post('/api/mastercodelist',body).then(response => {
     console.log(response.data);
     setSmallCode(response.data);
      });
     }
  }
  //공통 코드 데이터 조회
  useEffect(() => {
    axios.get('/api/smallcoderead').then(response => {  
      //console.log('smallcode : ',response.data);
      setSmallCode(response.data);
    });
    axios.get('/api/mastercode').then(response => {
      //console.log('mastercode : ',response.data);
      setMasterData(response.data);
    });
}, []);
  // //소코드 수정 버튼
  // const [UpdateSmallCode, setUpdateSmallCode] = useState(['']);
  // const [UpdateVisible, setUpdateVisible] = useState(false);
  // //수정 팝업 OFF
  // const handleUpdateOk = () => {
  //   setUpdateVisible(false);
  // }
  // //수정 팝업 OFF
  // const handleUpdateCancel = () => {
  //   setUpdateVisible(false);
  // }
  // //데이터 클릭 시 수정 팝업 ON
  // const handleUpdateClick = (updateCode) => {
  //   //console.log(updateCode);
  //   axios.post('/api/updatecode',updateCode).then(response => {
  //     setUpdateSmallCode(response.data);
  //     setUpdateVisible(true);
  //     //console.log(response.data.masterCode);
  //   });
  // }
  //main
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <SideBarSystem DefaultKey={'3'}/>
        <Layout style={{backgroundColor:'white'}}>
          <div style={{textAlignLast:'end',background: '#fff',padding:0}}>
            <Link  to="/">
              <Button style={{marginRight:'1%',marginTop:'10px'}}>로그아웃</Button>   
            </Link>
          </div>
          <PageHeader
            className="site-page-header"
            title="공통코드"
            subTitle="공통코드 페이지"
            style={{background: '#fff'}}
          />
          <Content>
          {/* <Breadcrumb style = {{background: '#fff', minHeight: 100}}>
              <Breadcrumb.Item>
                <PageHeader
                  className="site-page-header"
                  title="공통코드"
                  subTitle="공통코드 페이지">   
                </PageHeader>
              </Breadcrumb.Item>
            </Breadcrumb> */}
            {/* 선택창 */}
            <div style = {{fontSize: 20,background: '#fff', minHeight: 2}}>
            <Tabs tabBarStyle={{backgroundColor:'white'}}defaultActiveKey="2">
              <TabPane tab="대코드" key="1">
               <MasterCode></MasterCode>
              </TabPane>
              <TabPane tab="소코드" key="2">
                    <Select 
                    showSearch 
                    style={{ width: 200 }}
                    placeholder="대코드 검색"
                    onChange={onChange}>
                      <Option key={'All'}>All</Option>
                      {Masterdata.map(code => (
                      <Option key={code.LargeCode}>{code.LargeInfo}</Option>
                        ))}
                    </Select>
                  <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >  
                    <Button onClick={showModal}>추가</Button>         
                    <CodeAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
                    <Button onClick={handleDelete}>삭제</Button>
                    {/* <Button onClick={showModal}>수정</Button>         
                    <CodeUpdate Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} /> */}
                  </div>
                  <Table 
                    style = {{background: '#fff'}} 
                    columns={CodeColumns} 
                    dataSource={SmallCode}
                    rowSelection={rowSelection}
                    size="middle"
                    //onRow={(record) => ({onClick: () => { handleUpdateClick(record); }})}
                  />
                  {/* {UpdateVisible ? <SmallCodeUpdate 
                  UpdateSmallCode={UpdateSmallCode} 
                  UpdateVisible={UpdateVisible} 
                  handleUpdateOk={handleUpdateOk} 
                  handleUpdateCancel={handleUpdateCancel} /> : null} */}
                  
              </TabPane>
            </Tabs>
            </div>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Code