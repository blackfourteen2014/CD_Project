import React from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { MyPagePasswordUpdate } from "../../../../_actions/user_action";

function MyPageUpdate(props) {
  const dispatch = useDispatch();
  const handleUpdateOk = () => {
    props.handleOk();
    if (props.Password === props.CheckPassword) {
      let body = {
        Password: props.Password,
        id: props.User[0].id,
      };
      //마이페이지 비밀번호 Update
      dispatch(MyPagePasswordUpdate(body)).then((response) => {
        if (response.payload.success) {
          alert("비밀번호가 변경되었습니다");
          window.location.reload();
        } else {
          alert("Error");
        }
      });
    } else {
      alert("비밀번호가 일치하지 않습니다");
    }
  };
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
  );
}

export default MyPageUpdate;
