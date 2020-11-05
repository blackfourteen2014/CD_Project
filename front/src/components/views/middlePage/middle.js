import React from 'react'

class middle extends React.Component() {
    render() {
        return (
            <div>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">날짜</td>
                            <td width="50">요일</td>
                            <td width="300">출·퇴근 시간</td>
                            <td width="300">근무 시간</td>
                            <td width="300">근무 내용</td>
                            <td width="300">초과 근무 시간</td>
                            <td width="300">초과 근무 내용</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default middle
