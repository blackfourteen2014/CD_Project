import React, {useState} from 'react'
import { Modal, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { MasterCodeCreate } from '../../_actions/system_action';

function MasterCodeAdd(props){
  const dispatch = useDispatch(); //redux
  const [LargeInfo, setLargeInfo] = useState('');
  const [LargeCode, setLargeCode] = useState('');

//state 값

  const handleChangeLargeCode = (e) => {
    setLargeCode(e.currentTarget.value);
  }
  const handleChangeLargeInfo = (e) => {
    setLargeInfo(e.currentTarget.value);
  }
 
//팝업 저장(유저 생성)
  const handleOk = () => {

    let body = {
      LargeCode:LargeCode,
      LargeInfo:LargeInfo,
    }
    //대코드 데이터 Create
    dispatch(MasterCodeCreate(body))
            .then(response => { 
                if(response.payload.largecodeSaveSuccess){ 
                  window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                  //alert('Success!',);
                  console.log(response.payload.largecodeSaveSuccess);
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
      <Input 
        placeholder=""
        value={LargeCode}
        onChange={handleChangeLargeCode}
      />

      <div>대코드정보</div>
      <Input 
        placeholder=""
        value={LargeInfo}
        onChange={handleChangeLargeInfo}
      />

      </Modal>
    </>
  );
}

export default MasterCodeAdd