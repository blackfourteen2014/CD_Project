import { Button } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import { Calendar } from 'react-big-calendar'; //빅캘린더
import moment from 'moment'; //날짜 및 시간 데이터

export const CustomToolbar = (toolbar) => {
    //이전 달 버튼 이벤트
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate('prev');
    };
    //다음 달 버튼 이벤트
    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate('next');
    };
    // Today버튼 이벤트
    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate('current');
    };
    //label ex)11 2020
    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span><b>{date.format('MM')}</b><span style={{fontSize:'20px'}}> {date.format('YYYY')}</span></span>
      );
    };
  
    return (
      <div className={Calendar['toolbar-container']}>
        <label className={Calendar['label-date']} style={{fontSize:'30px'}}>{label()}</label>
  
        <div className={Calendar['back-next-buttons']}>
          <Button className={Calendar['btn-back']} onClick={goToBack}>&#8249;</Button>
          <Button className={Calendar['btn-current']} onClick={goToCurrent}>Today</Button>
          <Button className={Calendar['btn-next']} onClick={goToNext}>&#8250;</Button>
        </div>
      </div >
    );
  };