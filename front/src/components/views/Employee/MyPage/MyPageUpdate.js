import React from 'react'
import { Modal } from 'antd';
import axios from 'axios';

function MyPageUpdate(props) {
    const handleUpdateOk = () => {
        props.handleOk();
        if(props.Password == props.CheckPassword){
            let body = {
              Password : props.Password,
              id : props.User[0].id
            }
            axios.post('/api/users/mypagepasswordupdate',body).then(response => {
                if(response.data.success){
                    alert('비밀번호가 변경되었습니다');
                    window.location.reload();
                }else{
                    alert('Error');
                }
            });
          }else{
            alert('비밀번호가 일치하지 않습니다');
          }
    }
    return (
        <>
            <Modal
                visible={props.Visible}
                onOk={handleUpdateOk}
                onCancel={props.handleCancel}
                >
                변경하시겠습니까?
            </Modal>
        </>
    )
}

export default MyPageUpdate
