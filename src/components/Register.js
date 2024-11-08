import React, { useEffect, useState } from "react";
import '../assets/css/Register.css';
// reactstrap components
import CallIcon from '@material-ui/icons/Call';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import firebase from 'firebase/app';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, CardTitle, Container, Label
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { AuthContext } from '../utils/context';

import isMobilePhone from 'validator/lib/isMobilePhone';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const validMobile = (val) => (
  !val ? true: (
  val.substring(0, 3) === '+88'?  isMobilePhone(val): 
  (val.substring(0, 2) === '88'? isMobilePhone("+" + val):
  isMobilePhone("+88" + val)))
)
const passwordsMatch = ({ password, confirmPassword }) => {
  return !confirmPassword || !password ||  password === confirmPassword;
};
const mustAgree = ({agree}) => agree === true;

function Register() {
  const authContext = React.useContext(AuthContext);
  const registerUser = authContext.registerUser;
  const register = authContext.register;
  const loginUser = authContext.loginUser;
  const clearRegsiter = authContext.clearRegsiter;
  const isAuthenticated = authContext.isAuthenticated;
  const loginUserThirdParty = authContext.loginUserThirdParty;

  const [creds, setCreds] = useState();
  const [errMess, setErrMess] = useState();
  const history = useHistory();

  // window.recapthaVerifier = new firebase.auth.RecaptchaVerifier('', {
  //   'size': 'invisible'
  // });

  const handleSubmit = (values) => {
    // console.log(values);
    registerUser({
      name: values.name,
      mobile: values.mobile,
      password: values.password
    });
    setCreds(values)
    // console.log('Register Status: ' + JSON.stringify(register));
  }

  const handleGoogleLogin = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(result => {
        // console.log(result);
        firebase.auth().currentUser.getIdToken(true)
          .then(idToken => {
            loginUserThirdParty({
              idToken
            }, 'google', history)
          }, err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err.message));
  }
  const handleFacebookLogin = () => {
    const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(facebookAuthProvider)
      .then(result => {
        console.log(result);
        firebase.auth().currentUser.getIdToken(true)
          .then(idToken => {
            loginUserThirdParty({
              idToken
            }, 'facebook', history)
          }, err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err.message));
  }

  // const serverError = (val) => errMess ? false : true;


  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      return;
    }
    if (register.hasRegsitered) {
      loginUser({
        username: creds.mobile,
        password: creds.password
      }, false);
      clearRegsiter();
      history.push('/')
    } else if (register.errMess) {
      if (register.errMess.name === 'UserExistsError') {
        setErrMess("There is already an account with this mobile number")
      } else setErrMess("Something went wrong! Try again");
    }
  }, [register])

  return (
    <Col lg="5" md="7" className="register">
      <Card className="register__card">
        <CardTitle className="register__card__title">
          <Container className="register__card__title__container">
            <Row className="register__title__sign">
              <p>Sign up with</p>
            </Row>
            <Row className="register__title__option">
              <Button onClick={handleGoogleLogin} outline className="register__title__button shadow">
                <img
                  src={require('../assets/icons/google.svg')}
                  alt="Google"
                />
                <strong>Google</strong>
              </Button>
              <Button onClick={handleFacebookLogin} outline className="register__title__button shadow">
                <img
                  className="facebook__icon"
                  src={require('../assets/icons/facebook.svg')}
                  alt="Facebook"
                />
                <strong>Facebook</strong>
              </Button>
            </Row>
          </Container>
        </CardTitle>
        <CardBody className="register__card__body">
          <Container className="register__card__body__container">
            <Row className="register__card__body__heading">
              <span>Or sign up with credentials</span>
            </Row>
            <Row className="register__card__body__input">
              <LocalForm model="user" validateOn="submit" validators={{
                '': { passwordsMatch, mustAgree },
                confirmPassword: { required }
              }} onSubmit={(values) => handleSubmit(values)} role="form" className="register__form">
                <FormGroup className="register__form__formgroup">
                  <InputGroup className="register__form__inputgroup">
                    <InputGroupAddon addonType="prepend" className="">
                      <InputGroupText className="register__form__input__icon">
                        <PersonIcon style={{}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control type="text" model=".name" id="name" name="name" placeholder="Name" autoComplete="new-name" validators={
                      {
                        required, minLength: minLength(3),
                        maxLength: maxLength(30)
                      }
                    } className="register__form__input__text" />

                  </InputGroup>
                  <Errors
                    className="text-danger p-2"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </FormGroup>
                <FormGroup className="register__form__formgroup">
                  <InputGroup className="register__form__inputgroup">
                    <InputGroupAddon addonType="prepend" className="">
                      <InputGroupText className="register__form__input__icon">
                        <CallIcon style={{}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control.text model=".mobile" id="mobile" name="mobile" placeholder="Mobile Number" validators={{
                      required, validMobile
                    }} className="register__form__input__text" />

                  </InputGroup>
                  <Errors
                    className="text-danger p-2"
                    model=".mobile"
                    show="touched"
                    messages={{
                      required: 'Required',
                      validMobile: 'Inavlid mobile number',
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <InputGroup className="register__form__inputgroup">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="register__form__input__icon">
                        <LockOpenIcon />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control model=".password" placeholder="Password" type="password" validators={{
                      required,
                      minLength: minLength(6),
                      maxLength: maxLength(29)
                    }} className="register__form__input__text" />


                  </InputGroup>
                  <Errors
                    className="text-danger p-2"
                    model=".password"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greather than 5 characters',
                      maxLength: 'Must be less than 30 characters'
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <InputGroup className="register__form__inputgroup">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="register__form__input__icon">
                        <LockOpenIcon />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control model=".confirmPassword" id="confirmPassword" name="confirmPassword" placeholder="Retype Password" type="password" className="register__form__input__text" />

                  </InputGroup>
                  <Errors
                    className="text-danger p-2"
                    model=".confirmPassword"
                    show="touched"
                    messages={{
                      required: 'Required',
                    }}
                  />
                  <Errors
                    className="text-danger p-2"
                    model="user"
                    show="touched"
                    messages={{
                      passwordsMatch: "Passoword doesn't match",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Row >
                    <Control.checkbox model=".agree" id="agree" name="agree" addon defaultChecked={false} key={Math.random()} aria-label="Checkbox for following text input" className="register__card__body__checkbox" />
                    <Label className="register__card__body__remember">I agree with privacy policy</Label>
                    <Errors
                      className="text-danger p-2 ml-3"
                      model="user"
                      show="touched"
                      messages={{
                        mustAgree: "You must agree with the policy",
                      }}
                    />
                    <span className="text-danger p-2 ml-3">{errMess ? errMess : ""}</span>
                    <Col xs={{ size: 6, offset: 4 }} className="register__card__body__submit">
                      <Button type="submit" className="register__card__body__sign__button">Sign up</Button>
                    </Col>

                  </Row>
                </FormGroup>
              </LocalForm>
            </Row>
          </Container>
        </CardBody>
      </Card>
      <Row className="mt-3 justify-content-center">
        <Col className="text-right text-center" xs="12">
          <Link to='/login' className="text-light">
            <strong>Already have an account? Sign in</strong>
          </Link>
        </Col>
      </Row>
    </Col>
  );
}

export default Register;