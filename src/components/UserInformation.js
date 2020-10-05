import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Col, CardTitle, Container, Label, CardSubtitle
} from "reactstrap";
import { DISTRICTS } from '../shared/Districts';
import { Form, Control, Errors, Field } from 'react-redux-form';
import { UserContext } from '../Context/context';


import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import ReduxFormSelect from './ReduxFormSelect';
import '../assets/css/UserInformation.css';

const required = (val) => val && val.length;
const requiredObject = (val) => val.value && val.value.length
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const validMobile = (val) => (
  !val ? true : (
    val.substring(0, 3) === '+88' ? isMobilePhone(val) :
      (val.substring(0, 2) === '88' ? isMobilePhone("+" + val) :
        isMobilePhone("+88" + val)))
);
const isPostalCode = (val) => !val || val.match(/^[1-9][0-9]{3}$/)

function UserInformation() {

  const districts = [{ value: 'noakhali', label: "noakhali" }, {
    value: 'dhaka', label: "dhaka"
  }]

  const handleSubmit = (values) => {
    console.log(values);
  }

  return (
    <div className="userinformation">
      {/* <Card> */}
        {/* <CardBody className="userinformation__card__body"> */}
          <CardTitle className="userinformation__card__title">
            <span>Your Information</span>
          </CardTitle>
          <Form model="user" onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="name" md={3}>Name</Label>
              <Col md={9}>
                <Control.text model=".name" id="name" name="name"
                  placeholder="Name"
                  className="form-control"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(30)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="mobile" md={3}>Mobile</Label>
              <Col md={9}>
                <Control.text model=".mobile" id="mobile" name="mobile"
                  placeholder="Mobile Number"
                  className="form-control"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    required,
                    validMobile
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".mobile"
                  show="touched"
                  messages={{
                    required: 'Required',
                    validMobile: 'Invalid Mobile number'
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="email" md={3}>Email</Label>
              <Col md={9}>
                <Control.text model=".email" id="email" name="email"
                  placeholder="Email"
                  className="form-control"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    validEmail: (val) => !val || isEmail(val)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    validEmail: 'Invalid Email'
                  }}
                />
              </Col>
            </Row>

            <CardTitle className="userinformation__card__title">
              <hr />
              <span>Your Address</span>
            </CardTitle>

            <Row className="form-group">
              <Label htmlFor="country" md={3}>Country</Label>
              <Col md={9}>
                <Control.text model=".country" id="country" name="country"
                  className="form-control"
                  disabled
                  defaultValue={{ "value": "Bangladesh", "label": "Bangladesh" }}
                  component={ReduxFormSelect}
                  validators={{
                    // requiredObject
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".country"
                  show="touched"
                  messages={{
                    // requiredObject: 'Required',
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="district" md={3}>District</Label>
              <Col md={9}>
                <Control.select model=".district" id="district" name="district"
                  className="form-control"
                  validators={{
                    // requiredObject
                  }}
                  placeholder="Search your district..."
                  component={ReduxFormSelect}
                  options={districts}
                />

                <Errors
                  className="text-danger"
                  model=".district"
                  show="touched"
                  messages={{
                    // requiredObject: 'Required',
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="thana" md={3}>Thana</Label>
              <Col md={9}>
                <Control.text model=".thana" id="thana" name="thana"
                  className="form-control"
                  placeholder="Your thana name"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    // required
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".thana"
                  show="touched"
                  messages={{
                    // required: 'Required',
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="region" md={3}>Region</Label>
              <Col md={9}>
                <Control.text model=".region" id="region" name="region"
                  className="form-control"
                  placeholder="Your region in the thana"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    // required
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".region"
                  show="touched"
                  messages={{
                    // required: 'Required',
                  }}
                />
              </Col>
            </Row>


            <Row className="form-group">
              <Label htmlFor="postalCode" md={3}>Postal Code</Label>
              <Col md={9}>
                <Control.text model=".postalCode" id="postalCode" name="postalCode"
                  className="form-control"
                  placeholder="Postal Code"
                  style={{
                    fontSize: "small"
                  }}
                  validators={{
                    // required
                    isPostalCode
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".postalCode"
                  show="touched"
                  messages={{
                    // required: 'Required',
                    isPostalCode: 'Invalid Postal Code'
                  }}
                />
              </Col>
            </Row>

            <Row className="form-group">
              <Label htmlFor="homeLocation" md={3}>Home Location</Label>
              <Col md={9}>
                <Control.text model=".homeLocation" id="homeLocation" name="homeLocation"
                  className="form-control"
                  placeholder="Street name/no, house name/no"
                  style={{
                    fontSize: "small",

                  }}
                  validators={{
                    // required
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".homeLocation"
                  show="touched"
                  messages={{
                    // required: 'Required',
                  }}
                />
              </Col>
        </Row>
        <hr />
        <Row className="checkout__button">
          <Col xs="12" >

              <Button className="checkout__button__confirm">
                Save Changes
                        </Button>
          </Col>
        </Row>
      </Form>


    </div>
  )
}

export default UserInformation;
