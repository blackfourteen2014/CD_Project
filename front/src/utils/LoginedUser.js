import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import "antd/dist/antd.css"; //antd디자인 CSS
import axios from "axios";

const { Text } = Typography;

function LoginedUser() {
  const [userName, setuserName] = useState(""); //로그인 시 이름 보임
  //로그인 시 이름 보임
  useEffect(() => {
    axios.get("/api/users/userdataread").then((res) => {
      //console.log(res.data);
      setuserName(res.data.userName);
    });
  }, []);
  return (
    <>
      <Text style={{ marginRight: "3em", fontSize: "18px" }}>
        {userName} 님
      </Text>
    </>
  );
}

export default LoginedUser;
