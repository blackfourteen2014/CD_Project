import React from 'react'
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {OnWorkUser} from '../_actions/user_action';

function OnWork(props) {
    const dispatch = useDispatch(); //redux
    //체크 시 출근
    const handleCheck = () =>{
        let body ={ //보낼 값
            date:props.Date,
            time:props.Time
        }
        dispatch(OnWorkUser(body))
                .then(response => { 
                    console.log(response);
                    if(response.payload.success){ 
                        console.log(response.payload);
                        window.location.reload();
                    }
                    else {
                        alert('Failed...');
                    }
                }) 
    }
    //modal
    return (
        <>
        <Modal
          visible={props.OnVisible}
          onOk={props.handleOnOk}
          afterClose={handleCheck}
          closable={false}
          cancelButtonProps={{disabled: true}}
          width={250}
          style={{textAlign:'center'}}
        >
          출근되었습니다
        </Modal>
        </>
    )
}

export default OnWork
