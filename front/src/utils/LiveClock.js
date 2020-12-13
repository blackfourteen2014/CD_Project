import React from "react";
import Clock from "react-live-clock";

function LiveClock() {
  return (
    <div style={{ background: "dark", color: "white", textAlign: "center" }}>
      <div style={{ fontSize: "20px" }}>
        <Clock format={"YYYY 년 MM 월 DD 일"} ticking={true} />
      </div>
      <div style={{ fontSize: "45px" }}>
        <Clock format={"HH:mm:ss"} ticking={true} />
      </div>
    </div>
  );
}

export default LiveClock;
