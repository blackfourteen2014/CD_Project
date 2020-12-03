import React, {useState,useEffect} from 'react'
import { Table, Button } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import axios from 'axios';
import MasterCodeAdd from '../SystemAdd/MasterCodeAdd';
//import MasterCodeUpdate from '../SystemUpdate/MasterCodeUpdate';
import {DeCodeColumns} from './ColumnTable'; //ColumnTable 내에 함수 사용

function MasterCode(props) {
  const [data, setData] = useState([]);//칼럼 안 데이터
  const [Visible, setVisible] = useState(false); //modal 관리
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상
  //체크박스
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCheckTarget(selectedRows);
    }
  };
   //수정
//  const handleSave = () =>{
//    axios.post('/api/mastercodeupdate', CheckTarget).then(response => {
   
//    });
//   }
  //delete
  const handleDelete = () => {
    axios.post('/api/mastercodedelete', CheckTarget).then(res =>{
     if(res.data.success){
     alert('삭제되었습니다.');
     window.location.reload();
      }
    })
  }
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
  //공통 코드 데이터 조회
  useEffect(() => {
    axios.get('/api/MasterCode').then(response => {
      setData(response.data);
      console.log(response.data);
    });
}, []);
    //main
  return (
    <div>
      <div style = {{background: '#fff',minHeight: 32}}></div> 
      <div style = {{background: '#fff', minHeight: 20,textAlign:'end'}} >     
        <Button onClick={showModal}>추가</Button>   
        <MasterCodeAdd Visible={Visible} handleCancel={handleCancel} handleOk={handleOk} />
        <Button onClick={handleDelete}>삭제</Button>
        {/* <Button onClick={handleSave}>수정</Button>   
        <MasterCodeUpdate Visible={Visible} handleCancel={handleCancel} handleOk={handleOk}  /> */}
      </div>
        <Table style = {{background: '#fff'}} columns={DeCodeColumns} dataSource={data} rowSelection={rowSelection} size="middle" />
    </div>
  );
};

export default MasterCode