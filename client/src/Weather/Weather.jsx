import { useState, useEffect } from 'react';
import moment from 'moment';
import './weather.css'

function Weather() {
    const [date, setDate] = useState([]);
    const [temps, setTemps] = useState([]);
    const [todayWeather, setTodayWeather] = useState([]);

    const today = new Date();
    const year = today.getFullYear();
    const today_month = today.getMonth() + 1;
    const today_date = today.getDate();


    const getData = async () => {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=37.617396&lon=126.703532&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23`
        const response = await fetch(url);
        const data = await response.json();



        //실시간 날씨 정보
        const current_url = `https://api.openweathermap.org/data/2.5/weather?lat=37.617396&lon=126.703532&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23`;
        const current_response = await fetch(current_url);
        const currentData = await current_response.json();

        const currentData_main = currentData.weather[0].main;
        const currentData_feels = ((currentData.main.feels_like) - 273.15).toFixed(1);  //현재 캘빈 절대온도로 되어있음(체감온도)
        const currentRain = currentData.rain
        const currentHumidity = currentData.main.humidity
        const currentWind = currentData.wind.speed

        setTodayWeather({ main: currentData_main, feels: currentData_feels, wind: currentWind, humidity: currentHumidity })


        //시간 계산
        const times = data.list.map(item => item.dt_txt);
        const sixAmDate = times.filter(item => item.endsWith("06:00:00"));
        const temps = [];

        //날씨 데이터
        sixAmDate.map(dateTime => {
            const weather_data = data.list.find(item => item.dt_txt === dateTime);
            const temp = ((weather_data.main.temp) - 273.15).toFixed(1);
            temps.push(temp);
        });
        setTemps(temps);

        //날짜 년-월-일 시간
        let sixAmDateValues = sixAmDate.map(item => (item.split(" ")[0].split("-")));
        const formattedDates = [];
        sixAmDateValues.forEach(dateArray => {
            const month = dateArray[1];
            const day = dateArray[2];
            const formattedDate = `${month}/${day}`;
            formattedDates.push(formattedDate);
        });
        setDate(formattedDates);


    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='weather-container'>
            <div className="left-info">
                <div className="pic-gradient"></div>

                <div className='today-weather'>
                    <h1 className="weather-temp">
                        {todayWeather.feels} <span>℃</span>
                    </h1>
                    <h3>{todayWeather.main}</h3>
                </div>

            </div>

            <div className='right-info'>
                <div className="day-info">
                    <div>
                        <span className="title">Rain</span>
                        <span className="value">4%</span>
                    </div>
                    <div>
                        <span className="title">Humidity</span>
                        <span className="value">{todayWeather.humidity}%</span>
                    </div>
                    <div>
                        <span className="title">Wind</span>
                        <span className="value">{todayWeather.wind}km/h</span>
                    </div>


                    <ul className='days-list'>
                        {date.map((dateItem, index) => (
                            <li key={index}>

                                <span>{dateItem}</span>
                                <span className='day-temp'>{temps[index]} ℃</span>
                            </li>
                        ))}
                    </ul>



                </div>
            </div>

        </div>
    )


}

export default Weather;
