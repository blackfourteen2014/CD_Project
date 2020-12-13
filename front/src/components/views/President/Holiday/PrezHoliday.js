import React, { useState, useEffect } from "react";
import { Layout, Button, Table, PageHeader } from "antd";
import "antd/dist/antd.css";
import LoginedUser from "../../../../utils/LoginedUser";
import LogoutUser from "../../../../utils/LogoutUser";
import SideBar from "../../../../utils/SideBarPresident";
import HolidayUserAdd from "../../Employee/HolidayUser/HolidayUserAdd";
import { Calendar, momentLocalizer } from "react-big-calendar"; //캘린더============
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "./Calendar.scss"; //scss 재정의=============================================
import { prezHoliColumns } from "./PrezHoliColumns";
import { useDispatch } from "react-redux";
import { CustomToolbar } from "../../../../utils/CustomToolbar";
import { HolidayDataRead } from "../../../../_actions/system_action";
import {
  HolidayPrezUserListRead,
  HolidayUserConfirm,
} from "../../../../_actions/user_action";

const { Content } = Layout;
const localizer = momentLocalizer(moment);

function PrezHoli(props) {
  const dispatch = useDispatch();
  const [HolidayUserData, setHolidayUserData] = useState(""); //날짜 정보
  const [ListData, setListData] = useState([""]); //휴일 정보

  useEffect(() => {
    //달력 휴일 데이터 Read
    dispatch(HolidayDataRead()).then((response) => {
      setListData(response.payload);
    });
    //직원의 연가 데이터 Read
    dispatch(HolidayPrezUserListRead()).then((response) => {
      setHolidayUserData(response.payload);
    });
  });

  const [Visible, setVisible] = useState(false);
  //팝업 ON
  const showModal = () => {
    setVisible(true);
  };
  //팝업 OFF
  const handleCancel = () => {
    setVisible(false);
  };
  //팝업 OFF 및 데이터 보내기
  const handleOk = () => {
    setVisible(false);
  };
  //선택 창
  const [CheckTarget, setCheckTarget] = useState([""]);

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
  //연가 승인 버튼
  const handleConfirm = () => {
    //연가 승인 Update
    dispatch(HolidayUserConfirm(CheckTarget)).then((response) => {
      if (response.payload.success) {
        alert("승인되었습니다.");
        window.location.reload();
      }
    });
  };
  return (
    <div>
      <Layout>
        <SideBar DefaultKey={"2"} />
        <Layout>
          <div
            style={{
              textAlignLast: "end",
              background: "#fff",
              padding: "10px",
            }}
          >
            <LoginedUser />
            <LogoutUser pageChange={props} />
          </div>
          <PageHeader
            className="site-page-header"
            title="연가"
            subTitle="연가신청 페이지"
            style={{ backgroundColor: "#fff" }}
          />
          <Content>
            {/* 캘린더 */}
            <Calendar
              className="cal"
              localizer={localizer}
              events={ListData}
              startAccessor="start"
              endAccessor="end"
              views={{ month: true }}
              components={{
                toolbar: CustomToolbar,
              }}
            />
            <Button className="btn" onClick={showModal}>
              연가신청
            </Button>
            <HolidayUserAdd
              Visible={Visible}
              handleCancel={handleCancel}
              handleOk={handleOk}
            />
            <Button className="btn" onClick={handleConfirm}>
              연가승인
            </Button>
            <Table
              columns={prezHoliColumns}
              dataSource={HolidayUserData}
              rowSelection={rowSelection}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default PrezHoli;
