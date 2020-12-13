import React, { useState, useEffect } from "react";
import { Layout, Button, Table, Select, DatePicker, PageHeader } from "antd";
import "antd/dist/antd.css";
import SideBar from "../../../../utils/SideBarPresident";
import LoginedUser from "../../../../utils/LoginedUser";
import LogoutUser from "../../../../utils/LogoutUser";
import EmployeeManageInfo from "./EmployeeManageInfo";
import { EmployeeManageColum } from "./EmployeeManageColums";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  EmployeeManageUserListRead,
  EmployeeManageUserMonthlyListRead,
} from "../../../../_actions/user_action";
import { DeptCodeListRead } from "../../../../_actions/system_action";
import { EmployeeManageUserWorkDeptCodeListSearch } from "../../../../_actions/all_action";

const { Content } = Layout;
const { Option } = Select;

function EmployeeManage(props) {
  const dispatch = useDispatch();
  const [DeptList, setDeptList] = useState([""]); //부서검색
  function onSelectChange(value) {
    if (value === "All") {
      //직원근무조회 유저리스트 Read
      dispatch(EmployeeManageUserListRead(SaveDate)).then((response) => {
        setUserList(response.payload);
      });
    } else {
      let body = {
        SmallInfo: value,
        SaveDate: SaveDate[0],
      };
      //직원근무조회 부서코드로 유저 근무조회
      dispatch(EmployeeManageUserWorkDeptCodeListSearch(body)).then(
        (response) => {
          setUserList(response.payload);
        }
      );
    }
  }
  //직원근무조회
  const CurrentDate = useState(moment().format("YYYY/MM/DD")); //현재 날짜
  const [UserList, setUserList] = useState([""]); //직원근무조회 유저 데이터 변수
  const [SaveDate, setSaveDate] = useState(CurrentDate); //보낼 데이터
  const [SelectYear, setSelectYear] = useState("");
  const [SelectMonth, setSelectMonth] = useState("");

  useEffect(() => {
    //직원근무조회 유저리스트 Read
    dispatch(EmployeeManageUserListRead(CurrentDate)).then((response) => {
      setUserList(response.payload);
    });
    //부서코드 리스트 Read
    dispatch(DeptCodeListRead()).then((response) => {
      setDeptList(response.payload);
    });
  }, []);
  //데이터 피커 창에서 날짜 선택 시
  const handleChangeDate = (e) => {
    if (e != null) {
      const SelectedDate = [e.format("YYYY/MM/DD")]; //선택한 날짜

      setSaveDate(SelectedDate); //직원 리스트에서 직원 선택 시 보여줄 월
      setSelectYear(e.format("YYYY")); //년도
      setSelectMonth(e.format("MM")); //월
      //직원근무조회 유저리스트 Read
      dispatch(EmployeeManageUserListRead(SelectedDate)).then((response) => {
        setUserList(response.payload);
      });
    }
  };
  //해당 직원 월별 근무 조회
  const [Visible, setVisible] = useState(false); //팝업 창 변수
  const [UserData, setUserData] = useState(""); //받아온 유저 데이터 변수
  const [WorkTimeSum, setWorkTimeSum] = useState(0); //총 근무시간 데이터 변수
  const [User, setUser] = useState([""]);
  //직원 월별 근무 조회 GET
  const handleWorkInformation = (value) => {
    //보낼 데이터
    const sendData = {
      UserID: value.id,
      SaveDate: SaveDate[0],
    };
    //직원근무조회 클릭 시 월별 근무 조회
    dispatch(EmployeeManageUserMonthlyListRead(sendData)).then((response) => {
      setUserData(response.payload.userList);
      setWorkTimeSum(response.payload.userWorkTimeSum);
    });
    setUser(value);
    setVisible(true);
  };
  //팝업 OFF
  const handleOk = () => {
    setVisible(false);
  };
  //팝업 OFF
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar DefaultKey={"3"} />
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
            title="직원근무조회"
            subTitle="직원근무조회 페이지"
            style={{ backgroundColor: "#fff" }}
          />
          <Content style={{ margin: "0 auto", width: "100%" }}>
            <div>
              <div>
                <div style={{ display: "inline-block" }}>
                  <Button
                    disabled
                    style={{ backgroundColor: "orange", color: "black" }}
                  >
                    부서선택
                  </Button>
                </div>
                <div style={{ display: "inline-block" }}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="근무부서 검색"
                    onChange={onSelectChange}
                  >
                    <Option key={"All"}>All</Option>
                    {DeptList.map((code) => (
                      <Option key={code.SmallInfo}>{code.SmallInfo}</Option>
                    ))}
                  </Select>
                </div>
                <div style={{ display: "inline-block", marginLeft: "20%" }}>
                  <DatePicker
                    onChange={handleChangeDate}
                    defaultValue={moment(CurrentDate[0], "YYYY/MM/DD")}
                    format="YYYY/MM/DD"
                    style={{ width: "300px" }}
                  />
                </div>
              </div>
              <div>
                <Table
                  columns={EmployeeManageColum}
                  dataSource={UserList}
                  pagination={false}
                  onRow={(record) => ({
                    onClick: () => {
                      handleWorkInformation(record);
                    },
                  })}
                />
                {Visible ? (
                  <EmployeeManageInfo
                    Visible={Visible}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    UserData={UserData}
                    WorkTimeSum={WorkTimeSum}
                    SelectYear={SelectYear}
                    SelectMonth={SelectMonth}
                    User={User}
                  />
                ) : null}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default EmployeeManage;
