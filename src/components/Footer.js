import React from 'react';
import '../assets/css/Footer.css';
import { Row, Col, Container } from 'reactstrap';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

function Footer() {
    return (
        <div className="footer">
            <Container className="footer__container">
                <Row className="footer__row ">
                    <Col xs={{ size: 4, }} className="footer__left">
                        <Row className="footer__left__payment">
                            <Col xs={{ size: 12 }}>
                                <p>Payment System</p>
                            </Col>
                        </Row>
                        <Row className="footer__left__sociallink">
                            <Col xs={{ size: 12 }}>
                                <p>Our Social Links</p>
                            </Col>
                            <Col xs={{ size: 12 }} className="footer__left__social__icon">
                                <a href=""><FacebookIcon style={{fontSize: 30, color: "#3b5998",}} /></a>
                                <a href=""> <YouTubeIcon style={{fontSize: 30, color: "#FF0000"}} /></a>
                            </Col>
                        </Row>
                        <Row className="footer__left__sociallink_icon"></Row>
                    </Col>
                    <Col xs={{ size: 8 }} className="footer__right">
                        <Row className="footer__right__address__heading">
                            <h6>Contact Address</h6>
                        </Row>
                        <Row>
                            <Col sm={{ size: 9 }} className="footer__right__address">
                                <address className="">
                                    Jatrabari, Dhaka, Bangladesh<br />
                                    <CallIcon />: +8801864510094<br />
                                    <EmailIcon />: <a href="mailto:tushar27156@gmail.com"> tushar27156@gmail.com</a>
                                </address>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="footer__copyright">
                    <Col md="3" className="">
                        <span>© Copyright Nipun's Gallery</span>
                    </Col>
                    <Col md="5" className="">
                        <span>© Developed by: Abdur Rashid Tushar (CSE, BUET)</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;