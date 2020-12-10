import React, {useState,useEffect} from 'react'
import { Select, Layout, PageHeader,Table, Button } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import ManageAdd from '../SystemAdd/ManageAdd';
import { Link } from "react-router-dom";
import {ManageColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용
import SideBarSystem from '../../utils/SideBarSystem';
import ManageUpdate from '../SystemUpdate/ManageUpdate';
import {useDispatch} from 'react-redux';
import {UserRead, UserDelete, DeptCodeListRead, DeptCodeSearch} from '../../_actions/system_action';

const { Content } = Layout;

function Manage() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);//칼럼 안 데이터
  const [DeptList, setDeptList] = useState(['']); //부서검색
  const { Option } = Select;
  const [Visible, setVisible] = useState(false); //modal 관리

  //dispatch로 가져오도록 바꿀 예정====================================
  useEffect(() => {
    //직원 데이터 Read
    dispatch(UserRead())
      .then(response=>{
        setData(response.payload);
      });
    //부서코드 리스트 Read
    dispatch(DeptCodeListRead())
      .then(response=>{
        setDeptList(response.payload);
      });
}, []);
  //직원관리 삭제 버튼
  const handleDelete = () => {
    //유저 데이터 Delete
    dispatch(UserDelete(CheckTarget))
      .then(response=>{
        if(response.payload.success){
          alert('삭제되었습니다.');
          window.location.reload();
        }
        else{
          alert('삭제 실패...');
        }
      });
  }
  //=================================================================
  //체크박스
  const [CheckTarget, setCheckTarget] = useState(['']); //체크 박스 한 대상

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckTarget(selectedRows);
    }
  };
  ///ManageAdd 분리//////////////////////////
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
  ///////////////////////////////////////////
  //근무부서 선택
  function onChange(value) {
    if(value === 'All') {
     //직원 데이터 Read
      dispatch(UserRead())
        .then(response=>{
          setData(response.payload);
        });
    }
    else {
      let body = {
        SmallInfo : value
      }
      //부서코드 Search
      dispatch(DeptCodeSearch(body))
        .then(response=>{
          setData(response.payload);
        });
    }
  }
  // 수정 버튼
  const [UpdateVisible, setUpdateVisible] = useState(false);
  const [UserData, setUserData] = useState(['']);

  const handleUpdateClick = (updateUser) => {
    setUserData(updateUser);
    setUpdateVisible(true);
  }
  const handleUpdateOk = () => {
    setUpdateVisible(false);
  }
  const handleUpdateCancel = () => {
    setUpdateVisible(false);
  }
  //main
  return (
    <div>
      <Layout style={{ minHeight: '100vh'}}>
        <SideBarSystem DefaultKey={'2'}/>
        <Layout style={{backgroundColor:'white'}}>
          <div style={{textAlignLast:'end',background: '#fff',padding:0}}>
            <Link  to="/">
              <Button style={{marginRight:'1%', marginTop:'10px'}}>로그아웃</Button>   
            </Link>
          </div>
          <PageHeader
            className="site-page-header"
            title="직원관리"
            subTitle="직원관리 페이지"
            style={{background: '#fff'}}
          />
          <Content>
            {/* 부서선택 */}
            <div style = {{fontSize: 20,background: '#fff', minHeight: 2}}>
              <Select showSearch style={{ width: 200 }} placeholder="근무부서 검색"
                  onChange={onChange}
              >
               <Option key={'All'}>All</Option>
                {DeptList.map(code => (
               <Option key={code.SmallInfo}>{code.SmallInfo}</Option>
              ))}
                </Select>
              <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >
                <Button onClick={showModal}>추가</Button>
                <ManageAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
                <Button onClick={handleDelete}>삭제</Button>
                {/* <Button>수정</Button> */}
              </div>
              <Table 
                style = {{background: '#fff'}} 
                columns={ManageColumns} 
                dataSource={data} 
                rowSelection={rowSelection} 
                onRow={(record) => ({onClick: () => { handleUpdateClick(record); }})} 
              />
              {UpdateVisible ?  <ManageUpdate UpdateVisible={UpdateVisible} handleUpdateOk={handleUpdateOk} handleUpdateCancel={handleUpdateCancel} UserData={UserData} />:null}
            </div>
            </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default Manage