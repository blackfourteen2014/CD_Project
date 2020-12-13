import React from "react"; //리액트
import { Layout, PageHeader } from "antd"; //antd디자인
import "antd/dist/antd.css"; //antd디자인 CSS
import LoginedUser from "../../../../utils/LoginedUser"; ///utils 폴더
import LogoutUser from "../../../../utils/LogoutUser";
import SideBar from "../../../../utils/SideBarEmployee"; ///여기까지
import MainWork from "./MainWork"; //근무조회
import "../../user.css";

const { Content } = Layout;

function MainPage(props) {
  return (
    <div>
      <Layout>
        <SideBar DefaultKey={"1"} />
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
            title="홈 바로가기"
            subTitle="월 근무조회 페이지"
            style={{ backgroundColor: "#fff" }}
          />
          <Content>
            <MainWork />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default MainPage;
