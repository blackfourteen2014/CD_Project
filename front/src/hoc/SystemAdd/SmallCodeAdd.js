import React, {useState,useEffect} from 'react'
import { Modal, Select,Input } from 'antd';
import { useDispatch } from 'react-redux';
import { SmallCodeCreate } from '../../_actions/system_action';
import axios from 'axios';

const { Option } = Select;

function CodeAdd(props){
  const dispatch = useDispatch(); //redux
  const [SmallCode, setSmallCode] = useState(''); //스몰 코드 변수
  const [SmallInfo, setSmallInfo] = useState(''); //스몰 코드 정보 변수
  const [SmallContent, setSmallContent] = useState(''); //스몰 코드 비고 변수

//스몰 코드 변수 설정 기능
  const handleChangeSmallCode = (e) => {
    setSmallCode(e.currentTarget.value);
  }
  const handleChangeSmallInfo = (e) => {
    setSmallInfo(e.currentTarget.value);
  }
  const handleChangeSmallContent= (e) => {
    setSmallContent(e.currentTarget.value);
  }

  const [SaveCode,setSaveCode] = useState(''); //대코드 저장

  function onChange(value) {
    console.log(value);
    setSaveCode(value); //대코드
  }

  //대코드 종류 설정
  const [data, setData] = useState([]);
  useEffect(() => {         
    axios.get('/api/system/mastercoderead').then(response => {
      setData(response.data);
    });
    }, []);
  
//팝업 저장(유저 생성)
  const handleOk = () => {
    props.handleOk();

    let body = {
      LargeCode:SaveCode,
      SmallCode:SmallCode,
      SmallInfo:SmallInfo,
      SmallContent:SmallContent,
    }

    dispatch(SmallCodeCreate(body))
            .then(response => { 
                if(response.payload.smallcodeSaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  alert('Success!',);
                  console.log(response.payload.smallcodeSaveSuccess);
                }
                else {
                  alert('Failed to sign up...');
                }
            }) 
          }

  return (
    <>
      <Modal
      title="추가"
      visible={props.Visible}
      onOk={handleOk}
      onCancel={props.handleCancel}
      >
        <div>대코드</div>
        <Select showSearch style={{ width: 472 }} placeholder="마스터코드 지정"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
          option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {data.map(code => (
            <Option key={code.LargeCode}>{code.LargeInfo}</Option>
          ))}
        </Select>
        <div>소코드</div>
        <Input 
          placeholder=""
          value={SmallCode}
          onChange={handleChangeSmallCode}
        />
        <div>코드정보</div>
        <Input 
          placeholder=""
          value={SmallInfo}
          onChange={handleChangeSmallInfo}
        />
        <div>비고</div>
        <Input 
          placeholder="NULL가능"
          value={SmallContent}
          onChange={handleChangeSmallContent}
        />
      </Modal>
    </>
  );
}

export default CodeAdd