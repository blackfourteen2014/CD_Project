import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import "antd/dist/antd.css"; //antd디자인 CSS
import MasterCodeAdd from "../SystemAdd/MasterCodeAdd";
import { DeCodeColumns } from "./ColumnTable"; //ColumnTable 내에 함수 사용
import { useDispatch } from "react-redux";
import { MasterCodeRead, MasterCodeDelete } from "../../_actions/system_action";

function MasterCode() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]); //칼럼 안 데이터
  const [Visible, setVisible] = useState(false); //modal 관리
  const [CheckTarget, setCheckTarget] = useState([]); //체크 박스 한 대상
  //체크박스
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setCheckTarget(selectedRows);
    },
  };
  //대코드 삭제 버튼
  const handleDelete = () => {
    //대코드 데이터 Delete
    dispatch(MasterCodeDelete(CheckTarget)).then((response) => {
      if (response.payload.success) {
        alert("삭제되었습니다.");
        window.location.reload();
      }
    });
  };
  ///ManageAdd 분리//////////////////////////
  //팝업 창 ON
  const showModal = () => {
    setVisible(true);
  };
  //팝업 창 OFF
  const handleCancel = () => {
    setVisible(false);
  };
  //팝업 창 OFF
  const handleOk = () => {
    setVisible(false);
  };

  useEffect(() => {
    //대코드 데이터 Read
    dispatch(MasterCodeRead()).then((response) => {
      setData(response.payload);
    });
  });

  return (
    <div>
      <div style={{ background: "#fff", minHeight: 32 }}></div>
      <div style={{ background: "#fff", minHeight: 20, textAlign: "end" }}>
        <Button onClick={showModal}>추가</Button>
        <MasterCodeAdd
          Visible={Visible}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
        <Button onClick={handleDelete}>삭제</Button>
      </div>
      <Table
        style={{ background: "#fff" }}
        columns={DeCodeColumns}
        dataSource={data}
        rowSelection={rowSelection}
        size="middle"
      />
    </div>
  );
}

export default MasterCode;
