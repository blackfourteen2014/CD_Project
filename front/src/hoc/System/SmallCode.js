import React, {useState,useEffect} from 'react'
import { Select,Layout, PageHeader,Table, Button, Tabs } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Link } from "react-router-dom";
import CodeAdd from '../SystemAdd/SmallCodeAdd';
import MasterCode from './MasterCode';
import {CodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
import SideBarSystem from '../../utils/SideBarSystem';
import {useDispatch} from 'react-redux';
import {MasterCodeRead, SmallCodeRead, SmallCodeDelete, MasterCodeSearchListRead} from '../../_actions/system_action';

const { Content } = Layout;
const { TabPane } = Tabs;

function Code() {
  const dispatch = useDispatch();
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
  //소코드 삭제 버튼
 const handleDelete = () => {
  //소코드 데이터 Delete
  dispatch(SmallCodeDelete(CheckTarget))
      .then(response=>{
        if(response.payload.success){
            alert('삭제되었습니다.');
            window.location.reload();
        }
      });
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
      //소코드 데이터 Read
      dispatch(SmallCodeRead())
        .then(response=>{
          setSmallCode(response.payload);
        });
    }
    else {
      let body = {
        LargeCode : value
      }
      //소코드 페이지에서 대코드 리스트 검색 창 Read
      dispatch(MasterCodeSearchListRead(body))
        .then(response=>{
          setSmallCode(response.payload);
        });
    }
  }
  //공통 코드 데이터 조회
  useEffect(() => {
    //소코드 데이터 Read
    dispatch(SmallCodeRead())
        .then(response=>{
          setSmallCode(response.payload);
        });
    //대코드 데이터 Read
    dispatch(MasterCodeRead())
        .then(response=>{
          setMasterData(response.payload);
        });
  }, []);

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
                      </div>
                      <Table 
                        style = {{background: '#fff'}} 
                        columns={CodeColumns} 
                        dataSource={SmallCode}
                        rowSelection={rowSelection}
                        size="middle"
                      />
                      
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