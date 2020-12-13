import React from "react";
import { Modal } from "antd";
import "../../user.css";

function WorkManageInfo(props) {
  //console.log(props.UserData);
  return (
    <>
      <Modal
        visible={props.Visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        okText="확인"
        cancelText="닫기"
        width={550}
      >
        <div id="managewrap">
          <div className="manageleft">보낸 날짜</div>
          <div className="manageright">{props.UserData.Date}</div>
          <div className="manageleft">종료 날짜</div>
          <div className="manageright">{props.UserData.EndDate}</div>
          <div className="manageleft">부서</div>
          <div className="manageright">{props.UserData.Dept}</div>
          <div className="manageleft">직급</div>
          <div className="manageright">{props.UserData.Rank}</div>
          <div className="manageleft">이름</div>
          <div className="manageright">{props.UserData.User}</div>
          <div className="manageleft">제목</div>
          <div className="manageright">{props.UserData.Title}</div>
          <div id="managecontent">내용</div>
          <div id="managecontentprint">{props.UserData.Dsc}</div>
        </div>
      </Modal>
    </>
  );
}

export default WorkManageInfo;
