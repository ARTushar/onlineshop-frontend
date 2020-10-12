import React from 'react';
import '../assets/css/LoginRegister.css';
import {  Container, NavbarBrand, Row} from 'reactstrap';
import Login from './Login';
import Register from './Register';
import { Link } from 'react-router-dom';
import {
  FirebaseAuthProvider,
} from '@react-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../assets/config';

function LoginRegister({type, loginUser}) {
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
                <FirebaseAuthProvider firebase={firebase} {...config}>
                    <Row className="loginregister__login">
                        {type == 'register' ? <Register /> : <Login />}
                    </Row>
                </FirebaseAuthProvider>
            </Container>
        </div>
    )
}

export default LoginRegister;
