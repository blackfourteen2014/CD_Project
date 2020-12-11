import axios from 'axios';
import {
    DEPTCODE_SEARCH,
    EMPLOYEEMANAGEUSERWORKDEPTCODELIST_SEARCH
} from './types';

//부서코드 Search
export function DeptCodeSearch(dataToSubmit){
    const request = axios.post('/api/deptcodesearch', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: DEPTCODE_SEARCH,
        payload: request //true,false를 받는 부분
    }
}
//직원근무조회 부서코드로 유저 근무조회
export function EmployeeManageUserWorkDeptCodeListSearch(dataToSubmit){
    const request = axios.post('/api/employeeworkdeptcodelistsearch', dataToSubmit)
        .then(response => response.data)
    
    return {
        type: EMPLOYEEMANAGEUSERWORKDEPTCODELIST_SEARCH,
        payload: request //true,false를 받는 부분
    }
}