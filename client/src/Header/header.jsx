import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import cgv_logo from "../assets/cgv.png";
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export const daytime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
}

function Header({ isDarkTheme, toggleTheme }) {

    const today = daytime();

    const headerstyle = {
        backgroundColor: isDarkTheme ? '#222' : 'whitesmoke',
        color: isDarkTheme ? 'white' : 'black'
    };

    let todaydate = `${today.year}${today.month}${today.day}`

    return (
        <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
            <Container fluid>
                <Row className="header-container" style={headerstyle}>
                    <Col className="today">
                        <h2>{today.year}</h2>
                        <h3>{today.month}월{today.day}일</h3>
                    </Col>
                    <Col className="cgv">
                        <a href={`http://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0298&date=${todaydate}`} style={{ width: 150 }}>
                            <img src={cgv_logo} alt="CGV Logo" className="header_img" />
                        </a>
                    </Col>
                    <Col>
                        <div className="tema-btn" onClick={toggleTheme}>
                            <span >
                                <FontAwesomeIcon icon={faSun} />
                            </span>
                            <span >
                                <FontAwesomeIcon icon={faMoon} />
                            </span>
                        </div>


                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header