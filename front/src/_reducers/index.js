import { combineReducers } from 'redux';
import user from './user_reducer';
//보통 복잡성을 줄이기 위해 하나의 프로젝트에 하나의 store를 원칙으로 함
//따라서, 우리가 각각의 기능별로 만들어 둔 리듀서를 
//하나의 스토어로 합치기 위해 rootReducer를 만듬
//store(스토어)은 상위 노드(부모 노드)에 상관없이 state(스테이트)를 변경할 수 있음(없다면 부모노드를 타고가서 변경해야함)
const rootReducer = combineReducers({
    user
}); 

export default rootReducer;