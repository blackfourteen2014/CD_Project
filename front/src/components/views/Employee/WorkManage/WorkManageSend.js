import React, { useState, useEffect } from "react";
import { Button, Table, Select, Input, Modal, DatePicker } from 'antd';
import { deptColums } from './WorkManageColumns';
import axios from 'axios';
import moment from 'moment';
import '../../user.css';

const { Option } = Select;
const { TextArea } = Input;

function WorkManageSend() {
    const [CheckTarget, setCheckTarget] = useState(['']); //선택한 유저 값
    //const [data, setData] = useState([]);//직원들 부서검색
    const [DeptList, setDeptList] = useState(['']); //부서검색
    //선택 박스
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setCheckTarget(selectedRows);
        }
    };
    //업무지시 부서선택
    function onSelectChange(value) {
        if(value == 'All'){
          axios.get('/api/workmanageuserlist').then(response => {  
            setUserList(response.data);
          });
        }else{
          let body = {
            SmallInfo : value
          }
          //부서코드로 검색
          axios.post('/api/deptCodelist',body).then(response => {  
            setUserList(response.data);
          });
        }
      }
    //모달창 변수
    const [Visible, setVisible] = useState(false);
    //팝업 ON
    const showModal = () => {
      setVisible(true);
    };
    //팝업 OFF
    const handleCancel = () => {
      setVisible(false);
     };
    //팝업 OFF, 데이터 보내기
    const handleOk = () => {
      setVisible(false);
      console.log('선택한 유저 :',CheckTarget);
      console.log('날짜 :',CurrentTime[0]);
      console.log('종료날짜 :', EndDate);
      console.log('제목 :',Title);
      console.log('내용 :',Des);
      let body = {
          checkUsers : CheckTarget,
          CurrentTime: CurrentTime[0],
          EndDate,
          Title,
          Des
      }
      //이제 보내서 저장하고 해당 유저는 있으면 보여줌.
      axios.post('/api/workmanagesave',body).then(response => {
          //console.log(response.data);
          if(response.data){
            alert('성공적으로 보냈습니다.');
            window.location.reload();
          } else {
            alert('Error');
          }
      });
    }
    //날짜 데이터 가져오기
    const CurrentTime = useState(moment().format('YYYY/MM/DD')); //현재 날짜
    const [EndDate, setEndDate] = useState(''); //종료 날짜
    //날짜 데이터 SET
    const handleDateChange = (value) => {
        //console.log(value);
        //console.log(value.format('YYYY/MM/DD'));
        setEndDate(value.format('YYYY/MM/DD'));
    }
    //제목 데이터 가져오기
    const [Title, setTitle] = useState(''); //제목
    //제목 데이터 SET
    const handleChangeTitle = (e) => {
        setTitle(e.currentTarget.value);
      }
    //내용 데이터 가져오기
    const [Des, setDes] = useState(''); //내용
    //내용 데이터 SET
    const handleChangeDes = (e) => {
        setDes(e.currentTarget.value);
    }
    // 직원 리스트 출력
    const [UserList, setUserList] = useState([]); //직원 리스트
    //데이터 GET
    useEffect(() => {
        axios.get('/api/deptlist').then(response => {
            setDeptList(response.data);
          });
    }, [])

    return (
        <div>
            <div id = "leftside">
                <div className = "deptbox">
                    <Button disabled id = "deptbtn">부서선택</Button>
                </div>
                <div className = "deptbox">
                    <Select className = "selectdept" showSearch placeholder="근무부서 검색"
                            onChange={onSelectChange}>
                        <Option key={'All'}>All</Option>
                        {DeptList.map(code => (
                        <Option key={code.SmallInfo}>{code.SmallInfo}</Option>
                        ))}
                    </Select>
                </div>
                <div id = "emplist">
                    <div id = "emplist_title">
                        직원리스트
                    </div>
                    <Table columns={deptColums} dataSource={UserList} rowSelection={rowSelection} pagination={false} />
                </div>
            </div>
            <div id = "rightside">
                <div id = "rightwrap">
                    <div className = "rightlabel">
                        보낸날짜
                    </div>
                    <div id = "rightstart">
                        {CurrentTime}
                    </div>
                    <div className = "rightlabel">
                        종료날짜
                    </div>
                    <div id = "rightend">
                        <DatePicker
                        className = "enddate"
                        size = "large"
                        onChange={handleDateChange}
                        />
                    </div>
                    <div className = "rightlabel">
                        제목
                    </div>
                    <div id = "righttitle">
                        <Input className = "inputtitle" onChange={handleChangeTitle} />
                    </div>
                    <div className = "rightlabel">
                        내용
                    </div>
                    <TextArea rows={10} onChange={handleChangeDes}/>
                    <Button className = "btn" onClick = {showModal}>보내기</Button>
                    <Modal
                        visible={Visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        보내시겠습니까?
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default WorkManageSend