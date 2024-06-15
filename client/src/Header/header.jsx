import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import cgv_logo from "../assets/cgv.png";
import './header.css'
export const daytime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
}

function header() {



    const today = daytime();


    let todaydate = `${today.year}${today.month}${today.day}`

    return (
        <Container fluid>
            <Row className="header-container">
                <Col className="today">
                    <h2>{today.year}</h2>
                    <h3>{today.month}월{today.day}일</h3>
                </Col>
                <Col className="cgv">
                    <a href={`http://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0298&date=${todaydate}`} style={{ width: 150 }}>
                        <img src={cgv_logo} alt="CGV Logo" className="header_img" />
                    </a>
                </Col>
            </Row>
        </Container>
    )
}

export default header