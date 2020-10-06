import React from 'react';
import '../assets/css/LoginRegister.css';
import {  Container, NavbarBrand, Row} from 'reactstrap';
import Login from './Login';
import Register from './Register';
import { Link } from 'react-router-dom';

function LoginRegister({type}) {
    return (
        <div className="loginregister">
            <Container className="loginregister__container">
                <Row className="loginregister__logo">
                    <Link to='/home'>
                        <img className="loginregister__logo__img"
                            src="/images/logo8.png"
                            alt="logo"
                        />
                    </Link>
                </Row>
                <Row className="loginregister__title">
                    <h2>Welcome to Nipun's Gallery!</h2>
                </Row>
                <Row className="loginregister__login">
                    {type == 'register' ? <Register /> : <Login />}
                </Row>
            </Container>
        </div>
    )
}

export default LoginRegister;
