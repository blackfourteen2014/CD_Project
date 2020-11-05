import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; //react-router-dom을 가져옴
//페이지 import
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import ManagePage from './components/views/SystemPage/ManagePage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/system" component={ManagePage} />
        </Switch>
      </div>
    </Router>//router(해당 페이지의 최적의 경로로 넘어갈 수 있게 해주는 기능) 설정
  );
}

export default App;