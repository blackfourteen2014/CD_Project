import React,{ useState,useEffect } from 'react';
import { Modal, Select,Input } from 'antd';
import { useDispatch } from 'react-redux';
import { UserUpdate, DeptCodeListRead, RankCodeListRead } from '../../_actions/system_action';

const { Option } = Select;

function ManageUpdate(props) {
    const dispatch = useDispatch(); //redux
    const [Id, setId] = useState(props.UserData.id);
    const [Name, setName] = useState(props.UserData.name);
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState(props.UserData.email);
    const [Phone, setPhone] = useState(props.UserData.phone);
    const [Zim, setZim] = useState(props.UserData.zim);
    const [Address, setAddress] = useState(props.UserData.address);
    const [Des, setDes] = useState(props.UserData.des);
    const [Dept, setDept] = useState(props.UserData.dept);
    const [Rank, setRank] = useState(props.UserData.rank);
    //state 값
    const handleChangeName = (e) => {
        setName(e.currentTarget.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.currentTarget.value);
    }
    const handleChangeEmail= (e) => {
        setEmail(e.currentTarget.value);
    }
    const handleChangePhone = (e) => {
        setPhone(e.currentTarget.value);
    }
    const handleChangeZim = (e) => {
        setZim(e.currentTarget.value);
    }
    const handleChangeAddress = (e) => {
        setAddress(e.currentTarget.value);
    }
    const handleChangeDes = (e) => {
        setDes(e.currentTarget.value);
    }
    const handleDept = (value) => {
        console.log('부서 : ',value);
        setDept(value);
    }
    const handleRank = (value) => {
        console.log('직급 : ',value);
        setRank(value);
    }
    //팝업 저장(유저 생성)
    const handleOk = () => {
        let body = {
            id:Id,
            name:Name,
            password:Password,
            email:Email,
            phone:Phone,
            zim:Zim,
            address:Address,
            des:Des,
            dept:Dept,
            rank:Rank
        }
        //console.log(body);
        if(Password === ''){
            alert('비밀번호를 입력해주세요.');
        } else {
            props.handleUpdateOk();
            //유저 데이터 Update
            dispatch(UserUpdate(body))
                .then(response => { 
                    if(response.payload.CreateSuccess){ 
                        console.log(response.payload.CreateSuccess);
                        alert('Success!',);
                        window.location.reload();//전체 페이지를 리로드(실제 배포할 때는 리로드할 구역을 살정해야함)
                    }
                    else {
                        alert('Failed to sign up...');
                    }
                })
        }
    }
    //부서코드
    const [DeptList, setDeptList] = useState(['']);
    const [RankList, setRankList] = useState(['']);

    useEffect(() => {
        //부서코드 리스트 Read
        dispatch(DeptCodeListRead())
            .then(response=>{
                setDeptList(response.payload);
            });
        //직급코드 리스트 Read 
        dispatch(RankCodeListRead())
            .then(response=>{
                setRankList(response.payload);
            });
    }, []);
    return (
        <>
        <Modal
          title="수정"
          visible={props.UpdateVisible}
          onOk={handleOk}
          onCancel={props.handleUpdateCancel}
        >
            <div>부서</div>
            <Select defaultValue={props.UserData.dept} style={{ width: 160 }} onChange={handleDept} >
            {DeptList.map(dept => (
                <Option key={dept.SmallInfo}>{dept.SmallInfo}</Option>
            ))}
            </Select>
            <div>직급</div>
            <Select defaultValue={props.UserData.rank} style={{ width: 160 }} onChange={handleRank} >
            {RankList.map(rank => (
                <Option key={rank.SmallInfo}>{rank.SmallInfo}</Option>
            ))}
            </Select>
    
            <div>사원번호</div>
            <Input 
            placeholder=""
            value={Id}
            disabled = {true}
            />
            <div>사원이름</div>
            <Input 
            placeholder=""
            value={Name}
            onChange={handleChangeName}
            />
    
            <div>비밀번호</div>
            <Input.Password
            placeholder=""
            value={Password}
            onChange={handleChangePassword}
            />
    
            <div>이메일</div>
            <Input 
            placeholder=""
            value={Email}
            onChange={handleChangeEmail}
            />
    
            <div>핸드폰번호</div>
            <Input 
            placeholder=""
            value={Phone}
            onChange={handleChangePhone}
            />
    
            <div>우편번호</div>
            <Input 
            placeholder=""
            value={Zim}
            onChange={handleChangeZim}
            />
    
            <div>주소</div>
            <Input 
            placeholder=""
            value={Address}
            onChange={handleChangeAddress}
            />
    
            <div>비고</div>
            <Input 
            placeholder="*NULL 가능"
            value={Des}
            onChange={handleChangeDes}
            />
        </Modal>
      </>
    )
}

export default ManageUpdate
