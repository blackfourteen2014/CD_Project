import React,{ useState } from 'react';
import {Layout, Breadcrumb, PageHeader, Button, Input} from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS
import SideBar from '../../../../utils/SideBarEmployee';
import LoginedUser from '../../../../utils/LoginedUser';
import LogoutUser from '../../../../utils/LogoutUser';
import { useDispatch } from 'react-redux';
import { MyPagePasswordCheck } from '../../../../_actions/user_action';
import MyPage from './MyPage';
import '../../user.css';

const { Header, Content } = Layout;

function MyPageCheck(props) {
    const dispatch = useDispatch();
    const [Password, setPassword] = useState('');
    const [MypageShow, setMypageShow] = useState(false);

    const handleChangePassword = (e) => {
        setPassword(e.currentTarget.value);
      }

    const handleCheck = () => {
        //console.log("Check");
        let body = {
            Password
        }
        //마이페이지 현재 비밀번호 Check
        dispatch(MyPagePasswordCheck(body))
            .then(response => { 
                if(response.payload.success){
                    //console.log(response.payload.success);
                    setMypageShow(true);
                }
                else {
                  alert('비밀번호를 다시 확인해주세요.');
                }
            })
        } 

    return (
        <div>
        <Layout>
            <SideBar DefaultKey={'4'}/>
            <Layout>
                <Header className = "myheader">
                    <LoginedUser />
                    <LogoutUser pageChange={props}/>
                </Header>
                {MypageShow ? <MyPage /> :
                    <Content className = "mycontent">
                        <Breadcrumb className = "mybreadcrumb">
                            <Breadcrumb.Item>
                                <PageHeader
                                    title="개인정보변경"
                                    subTitle="마이 페이지">   
                                </PageHeader>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className = "mymain">
                            <div className = "mymaintitle">
                                <h2>본인확인</h2>
                            </div>
                            <div className = "inputpwlabel">
                                현재 비밀번호 :
                            </div>
                            <div className = "inputpw">
                                <Input.Password
                                    placeholder=""
                                    value={Password}
                                    onChange={handleChangePassword}
                                />
                            </div>
                            <Button onClick={handleCheck}>확인</Button>
                        </div>
                    </Content>
                }
            </Layout>
        </Layout>
    </div>
    );
}

export default MyPageCheck