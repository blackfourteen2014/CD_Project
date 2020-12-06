import React,{useState} from 'react'
import { Modal,Input } from 'antd';
import { useDispatch } from 'react-redux';
import { OffWorkUser } from '../_actions/user_action';

function OffWork(props) {
    const dispatch = useDispatch(); //redux
    const [WorkContent, setWorkContent] = useState(''); //근무시간
    const [OverWorkContent, setOverWorkContent] = useState('');//초과근무시간
    //근무시간
    const handleChangeWorkContent = (e) => {
        setWorkContent(e.currentTarget.value);
      }
     //초과근무시간
    const handleChangeOverWorkContent = (e) => {
        setOverWorkContent(e.currentTarget.value);
      }
    //체크 시 퇴근
    const handleCheck = () =>{
        let body ={ //보낼 값
            date:props.Date,
            time:props.Time,
            WorkContent,
            OverWorkContent
        }
        dispatch(OffWorkUser(body))
                .then(response => { 
                    console.log(response);
                    if(response.payload.success){ 
                        console.log(response.payload);
                        window.location.reload();
                    }
                    else {
                        alert('Failed...');
                    }
                }) 
    }
    //modal
    return (
        <>
        <Modal
          visible={props.OffVisible}
          onOk={props.handleOffOk}
          afterClose={handleCheck}
          closable={false}
          cancelButtonProps={{disabled: true}}
          width={250}
          style={{textAlign:'center'}}
        >
          <div>
            <p style={{backgroundColor:'orange'}}>퇴근시간</p>
                <p>{props.Time}</p>
            <p style={{backgroundColor:'orange'}}>근무내용
                <Input 
                    placeholder="근무내용 작성"
                    value={WorkContent}
                    onChange={handleChangeWorkContent}
                />
            </p>
            <p style={{backgroundColor:'orange'}}>초과근무내용
                <Input 
                    placeholder="초과근무내용 작성"
                    value={OverWorkContent}
                    onChange={handleChangeOverWorkContent}
                />
            </p>
          </div>
        </Modal>
        </>
    )
}

export default OffWork
