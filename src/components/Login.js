import React, { useState, useEffect } from "react";
import '../assets/css/Login.css';
import { Link, useHistory } from 'react-router-dom'

// reactstrap components
import CallIcon from '@material-ui/icons/Call';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, CardTitle, Container, Label
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";

import isMobilePhone from 'validator/lib/isMobilePhone';
import { AuthContext } from "../Context/context";
const required = (val) => val && val.length;
const validMobile = (val) => (
  !val ? true: (
  val.substring(0, 3) === '+88'?  isMobilePhone(val): 
  (val.substring(0, 2) === '88'? isMobilePhone("+" + val):
  isMobilePhone("+88" + val)))
)

function Login() {

  const authContext = React.useContext(AuthContext);
  const loginUser = authContext.loginUser;
  const auth = authContext.auth;
  const creds = auth.creds;

  const [errMess, setErrMess] = useState();

  const handleLogin = (values) => {
    console.log("creds: " + JSON.stringify(values))
    loginUser({
      username: values.username,
      password: values.password
    }, values.remember
    );
  };

  const history = useHistory();

  useEffect(() => {
    if(auth.isAuthenticated){
      history.push('/home');
    } else if(auth.errMess){
      if(auth.errMess.name === 'IncorrectUsernameError')
        setErrMess('Mobile Number is incorrect');
      else if(auth.errMess.name === 'IncorrectPasswordError')
        setErrMess('Password is incorrect');
      else
        setErrMess('Something went wrong! Try again')
    }

  }, [auth.errMess, auth.isAuthenticated])

  return (
    <Col lg="5" md="7" className="login">
      <Card className="login__card">
        <CardTitle className="login__card__title">
          <Container className="login__card__title__container">
            <Row className="login__title__sign">
              <p>Sign in with</p>
            </Row>
            <Row className="login__title__option">
              <Button outline className="login__title__button shadow">
                <img
                  src={require('../assets/icons/google.svg')}
                />
                <strong>Google</strong>
              </Button>
              <Button outline className="login__title__button shadow">
                <img
                  className="facebook__icon"
                  src={require('../assets/icons/facebook.svg')}
                />
                <strong>Facebook</strong>
              </Button>
            </Row>
          </Container>
        </CardTitle>
        <CardBody className="login__card__body">
          <Container className="login__card__body__container">
            <Row className="login__card__body__heading">
              <span>Or sign in with credentials</span>
            </Row>
            <Row className="login__card__body__input">
              <LocalForm model="creds" onSubmit={(values) => handleLogin(values)} className="login__form">
                <FormGroup  className="login__form__formgroup">
                  <InputGroup className="login__form__inputgroup">
                    <InputGroupAddon addonType="prepend" className="">
                      <InputGroupText className="login__form__input__icon">
                        <CallIcon style={{}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control type="text" validators={{
                      required, validMobile
                    }} defaultValue={creds? creds.username: ""} model=".username" placeholder="Mobile Number" className="login__form__input__text" />
                  </InputGroup>
                  <Errors
                      className="text-danger p-2"
                      model=".username"
                      show="touched"
                      messages={{
                        required: 'Required',
                        validMobile: 'Inavlid mobile number'
                      }}
                    />
                </FormGroup>
                <FormGroup>
                  <InputGroup className="login__form__inputgroup">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="login__form__input__icon">
                        <LockOpenIcon />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Control model=".password" type="password" placeholder="Password" defaultValue={creds? creds.password: ""} validators={{
                      required
                    }} className="login__form__input__text" />
                  </InputGroup>
                  <Errors
                      className="text-danger p-2"
                      model=".password"
                      show="touched"
                      messages={{
                        required: 'Required',
                      }}
                    />
                </FormGroup>
                <FormGroup>
                  <Row >
                    <Control.checkbox model=".remember" aria-label="Checkbox for following text input" 
                    defaultChecked={creds? creds.remember: false} className="login__card__body__checkbox" />
                    <Label className="login__card__body__remember">Remember me</Label>
                    <span className="col-12 text-danger p-2 ml-3">{errMess? errMess: ""}</span>
                    <Col xs={{ size: 6, offset: 4 }} className="login__card__body__submit">
                      <Button type="submit" className="login__card__body__sign__button">Sign in</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </LocalForm>
            </Row>
          </Container>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col xs="6">
          <a
            className="text-light"
            href="#pablo"
            onClick={e => e.preventDefault()}
          >
            <strong>Forgot password?</strong>
          </a>
        </Col>
        <Col className="text-right" xs="6">
          <Link to="/register" className="text-light">
            <strong>Create new account</strong>
          </Link>
        </Col>
      </Row>
    </Col>
  );
}

export default Login;
