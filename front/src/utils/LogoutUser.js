import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
//로그아웃 버튼 및 로그아웃 기능
function LogoutUser(props){
    const handleLogout =  () => {
        axios.get('/api/logout').then(response => { 
        //console.log(response.data);
        if(response.data.logoutSuccess){ 
            //console.log(props.pageChange);
            props.pageChange.history.push('/');
        } else {
            alert('로그아웃 실패...');
            }
    });
    }
return(
    <>
    <Button style={{marginRight:'1%'}} onClick={handleLogout}>로그아웃</Button>
    </>
);
}

export default LogoutUser