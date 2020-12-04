import './App.css';
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; //react-router-dom을 가져옴
//페이지 import
import EmployeeManage from './components/views/President/EmployeeManage/EmployeeManage';
import PrezHoli from './components/views/President/Holiday/PrezHoliday';
import PrezWorkManage from './components/views/President/WorkManage/PrezWorkManage';
import PrezMainPage from './components/views/President/MainPage/PrezMainPage';
import PrezMyPage from './components/views/President/MyPage/PrezMyPageCheck';
import MyPage from './components/views/Employee/MyPage/MyPageCheck';
import MainPage from './components/views/Employee/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import HolidayUser from './components/views/Employee/HolidayUser/HolidayUser';
import WorkManage from './components/views/Employee/WorkManage/WorkManage';
import Manage from './hoc/System/Manage';
import SmallCode from './hoc/System/SmallCode';
import MasterCode from './hoc/System/MasterCode';
import Holiday from './hoc/System/Holiday';

function App() {
  return (
    <Fragment>
      <Router>
          <Switch>
            <Route exact path="/employeemanage" component={EmployeeManage} />
            <Route exact path="/prezholi" component={PrezHoli} />
            <Route exact path="/prezmain" component={PrezMainPage} />
            <Route exact path="/prezmypage" component={PrezMyPage} />
            <Route exact path="/prezworkmanage" component={PrezWorkManage} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/main" component={MainPage} />
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/holidayuser" component={HolidayUser} />
            <Route exact path="/manage" component={Manage} />
            <Route exact path="/smallcode" component={SmallCode} />
            <Route exact path="/mastercode" component={MasterCode} />
            <Route exact path="/holiday" component={Holiday} />
            <Route exact path="/workmanage" component={WorkManage} />
          </Switch>
      </Router>
      {/* //router(해당 페이지의 최적의 경로로 넘어갈 수 있게 해주는 기능) 설정 */}
    </Fragment>
  );
}

export default App;