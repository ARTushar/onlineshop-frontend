import React from 'react';
import '../assets/css/Footer.css';
import { Row, Col, Container } from 'reactstrap';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
// import YouTubeIcon from '@material-ui/icons/YouTube';
import { Link } from 'react-router-dom';
import { HOTLINE, ADDRESS, EMAIL, FACEBOOK_LINK } from '../shared/information';

function Footer() {
    return (
        <div className="footer">
            <Container className="footer__container">
                <Row className="footer__row ">
                    <Col xs={12} sm={6} className="footer__left">
                        <Row className="footer__left__payment">
                            <Col xs={12} className="p-0 mb-2">
                                <Link style={{
                                    color: "inherit",
                                    fontSize: 'inherit'
                                }} to='/policy'>Privacy Policy</Link>
                            </Col>
                            {/* <Col xs={{ size: 12 }} className="p-0 mb-2">
                                <span>Payment System</span>
                            </Col> */}
                            {/* <Col xs={{ size: 12 }} className="mb-2">
                                <span>Cash On Delivery </span>
                                <span>Bkash</span>
                            </Col> */}
                        </Row>
                        <Row className="footer__left__sociallink">
                            <Col xs={{ size: 12 }} className="p-0 m mb-1">
                                <span>Our Social Links</span>
                            </Col>
                            <Col xs={{ size: 12 }} className="footer__left__social__icon">
                                <a href={FACEBOOK_LINK}><FacebookIcon style={{fontSize: 30, color: "#3b5998",}} /></a>
                                {/* <a href=""> <YouTubeIcon style={{fontSize: 30, color: "#FF0000"}} /></a> */}
                            </Col>
                        </Row>
                        <Row className="footer__left__sociallink_icon"></Row>
                    </Col>
                    <Col xs={{ size: 12 }} sm={6} className="footer__right">
                        <Row className="footer__right__address__heading">
                            <span>Contact Address</span>
                        </Row>
                        <Row>
                            <Col sm={{ size: 12 }} className="footer__right__address">
                                <address className="">
                                    {ADDRESS}<br />
                                    <CallIcon />: {HOTLINE}<br />
                                    <EmailIcon />: <a href={"mailto:" + EMAIL}> {EMAIL}</a>
                                </address>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="footer__copyright">
                    <Col md="3" className="">
                        <span>© Copyright: Nipun's Gallery</span>
                    </Col>
                    <Col md="5" className="">
                        <Row>
                        <span>© Developed by: ARTech (+8801864510094)</span>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;