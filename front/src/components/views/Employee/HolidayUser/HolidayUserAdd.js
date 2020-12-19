import React, { useState } from "react";
import { Modal, Descriptions, Input, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { HolidayUserCreate } from "../../../../_actions/user_action";
import "../../user.css";

const { Option } = Select; //선택한 옵션 기능
const { RangePicker } = DatePicker; //날짜 시작 - 날짜 종료 기능

function HolidayUserAdd(props) {
  const dispatch = useDispatch();
  //날짜
  const [StartDate, setStartDate] = useState(""); //시작 날짜
  const [EndDate, setEndDate] = useState(""); //종료 날짜
  //선택한 날짜 값
  const handleDate = (value) => {
    setStartDate(value[0].format("YYYY/MM/DD"));
    setEndDate(value[1].format("YYYY/MM/DD"));
  };
  //연가
  const [SelectedLeave, setSelectedLeave] = useState(""); //연가 종류
  const [Des, setDes] = useState(""); //연가 내용
  //선택한 연가 값
  const handleChange = (value) => {
    setSelectedLeave(value);
    //console.log(Leave);
  };
  //연가 내용
  const handleChangeDes = (e) => {
    setDes(e.currentTarget.value);
  };
  const handleOk = () => {
    props.handleOk();

    let body = {
      StartDate,
      EndDate,
      SelectedLeave,
      Des,
    };

    dispatch(HolidayUserCreate(body)).then((response) => {
      if (response.payload.success) {
        window.location.reload(); //전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
        alert("Success!");
      } else {
        alert("Failed...");
      }
    });
  };
  return (
    <>
      <Modal
        title="휴일설정"
        visible={props.Visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
        width={750}
      >
        <div>
          <Descriptions bordered className="descript">
            <Descriptions.Item label="날짜" span={3} className="desc_item">
              <RangePicker onChange={handleDate} />
            </Descriptions.Item>
            <Descriptions.Item label="연가종류" span={3} className="desc_item">
              <Select
                defaultValue="연가선택"
                onChange={handleChange}
                className="holyinput"
              >
                <Option value="연가">연가</Option>
                <Option value="병가">병가</Option>
                <Option value="공가">공가</Option>
                <Option value="특별휴가">특별휴가</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="연가내용" span={3} className="desc_item">
              <Input
                value={Des}
                onChange={handleChangeDes}
                className="holyinput"
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
    </>
  );
}

export default HolidayUserAdd;
