import React from "react";
import '../assets/css/Login.css';
import { Link } from 'react-router-dom'

// reactstrap components
import CallIcon from '@material-ui/icons/Call';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col, CardTitle, Container, Label
} from "reactstrap";

function Login() {
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
              <Form role="form" className="login__form">
                <FormGroup className="login__form__formgroup">
                  <InputGroup className="login__form__inputgroup">
                    <InputGroupAddon addonType="prepend" className="">
                      <InputGroupText className="login__form__input__icon">
                        <CallIcon style={{}} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Mobile Number" type="tel" autoComplete="new-mobile" className="login__form__input__text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="login__form__inputgroup">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="login__form__input__icon">
                        <LockOpenIcon />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" className="login__form__input__text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Row >
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" className="login__card__body__checkbox" />
                    <Label className="login__card__body__remember">Remember me</Label>
                    <Col xs={{ size: 6, offset: 4 }} className="login__card__body__submit">
                      <Button className="login__card__body__sign__button">Sign in</Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Form>
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
