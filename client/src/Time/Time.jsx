import React, { useEffect } from 'react'
import { useState } from 'react';
import moment from 'moment';
import { daytime } from '../Header/header';

import './time.css'
function Time() {
    const today = daytime();

    const [selectedWeek, setSelectedWeek] = useState(null);
    //주4

    const [resultTime4, setResultTime4] = useState("");
    const [resultTime4_2, setResultTime4_2] = useState("");
    //주2
    const [resultTime2, setResultTime2] = useState("");
    const [resultTime2_2, setResultTime2_2] = useState("");

    const [time, setTime] = useState("");


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000'); // 백엔드 서버로 요청
            if (!response.ok) {
                throw new Error('failed to fetch movie times');
            }
            const data = await response.json(); // JSON 형태로 변환
            setTime(data); // 시간 상태 업데이트

            // 주/2와 주/4 선택 시 계산된 결과를 미리 설정
            const [hour, minute] = data.split(":");
            setResultTime4(calculateEndTime(parseInt(hour), parseInt(minute), 7, 50)); // 주/4 계산 (마감)
            setResultTime4_2(calculateEndTime(parseInt(hour), parseInt(minute), 7, 20)); // 주/4 계산 (마감2)
            setResultTime2(calculateEndTime(parseInt(hour), parseInt(minute), 7, 20)); // 주/2 계산 (마감)
            setResultTime2_2(calculateEndTime(parseInt(hour), parseInt(minute), 6, 50)); // 주/2 계산 (마감2)

        } catch (err) {
            console.log(err); // 에러 처리
        }
    }

    const calculateEndTime = (hour, minute, hourDiff, minuteDiff) => {
        if (!hour || !minute) return "";
        const inputMoment = moment({ hour, minute }); // moment 객체 생성
        const result = inputMoment.subtract({ hours: hourDiff, minutes: minuteDiff }); // 계산
        return result.format("HH:mm"); // 시간 형식으로 포맷팅하여 반환
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="movie-times">
                <h2>{today.month}월 {today.day}일 </h2>
                <h2>마지막 영화시간</h2>
                <h3>{time}</h3>

            </div>
            <div className="time-table">
                <table>
                    <thead>
                        <tr>
                            <th>Part</th>
                            <th>출근 시간 (마감)</th>
                            <th>출근 시간 (마감2)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="week-row">
                            <td>주/4</td>
                            <td>{resultTime4}</td>
                            <td>{resultTime4_2}</td>
                        </tr>
                        <tr className="week-row">
                            <td>주/2</td>
                            <td>{resultTime2}</td>
                            <td>{resultTime2_2}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Time