import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../assets/css/Checkout.css';
import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
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
  Col, CardTitle, Container, Label, CardSubtitle
} from "reactstrap";
import { DISTRICTS } from '../shared/Districts';
import { Form, Control, Errors, Field } from 'react-redux-form';
import { UserContext } from '../Context/context';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import Select from 'react-select';
import ReduxFormSelect from './ReduxFormSelect';
import CurrencyFormat from 'react-currency-format';
import { selectTotalPrice } from '../redux/cart';

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

const RadioButton = (props) => (
  <RadioGroup onChange={val => props.onChange(val)}>
    <FormControlLabel value="cashOnDelivery" control={<Radio size="small" />} label={<span style={{fontSize: 'small', fontWeight: "500"}}>Cash On Delivery</span>} />
    <FormControlLabel value="onlinePayment" control={<Radio size="small"/>} label={<span style={{fontSize: 'small', fontWeight: "500"}}>Online Payment</span>} />
  </RadioGroup>
);

function Checkout({cartProducts, deliveryCost}) {
  const resetSignUpForm = React.useContext(UserContext);

  const [totalBill, setTotalBill] = React.useState(400);

  const districts = [{ value: 'noakhali', label: "noakhali" }, {
    value: 'dhaka', label: "dhaka"
  }]

  const handleSubmit = (values) => {
    console.log(values);
    resetSignUpForm();
  }

  return (
    <div className="checkout">
      <Container className="checkout__container">
          { cartProducts.length !== 0 ? (
        <Row className="checkout__row">
          <Col md="6" xl={{ size: "5", offset: "1" }} className="checkout__information">
            <Card className="checkout__card">
              <CardBody className="checkout__card__body">
                <CardTitle className="checkout__card__title">
                  <span>Shipping Information</span>
                </CardTitle>
                <Form model="order" onSubmit={(values) => this.handleSubmit(values)}>
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
                  <CardTitle className="checkout__card__title">
                    <hr />
                    <span>Shipping Address</span>
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
                          required
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".country"
                        show="touched"
                        messages={{
                          required: 'Required',
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
                          requiredObject
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
                          requiredObject: 'Required',
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
                          required
                        }}
                      />

                      <Errors
                        className="text-danger"
                        model=".thana"
                        show="touched"
                        messages={{
                          required: 'Required',
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
                          required
                        }}
                      />

                      <Errors
                        className="text-danger"
                        model=".region"
                        show="touched"
                        messages={{
                          required: 'Required',
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
                        }}
                      />

                      <Errors
                        className="text-danger"
                        model=".postalCode"
                        show="touched"
                        messages={{
                          required: 'Required',
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
                          required
                        }}
                      />

                      <Errors
                        className="text-danger"
                        model=".homeLocation"
                        show="touched"
                        messages={{
                          required: 'Required',
                        }}
                      />
                    </Col>
                  </Row>
                  <hr />
                  <Row className="form-group">
                    <Label htmlFor="deliveryNotes" md={3}>Delivery Notes</Label>
                    <Col md={9}>
                      <Control.textarea model=".deliveryNotes" id="deliveryNotes" name="deliveryNotes"
                        className="form-control"
                        placeholder="The notes written here will be included  with the ordered items. 😀"
                        style={{
                          fontSize: "small"
                        }}
                        validators={{
                        }}
                      />

                      <Errors
                        className="text-danger"
                        model=".postalCode"
                        show="touched"
                        messages={{
                          required: 'Required',
                        }}
                      />
                    </Col>
                  </Row>

                  {/* <Row className="form-group">
                    <Col md={{ size: 10, offset: 2 }}>
                      <Button type="submit" color="primary">
                        Send Feedback
                                    </Button>
                    </Col>
                  </Row> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" xl="5">
            <Card className="checkout__card">
              <CardBody className="checkout__card__body">
                <CardTitle className="checkout__card__title">
                  <span>Total Payment: </span>
                  <CurrencyFormat
                    value={selectTotalPrice(cartProducts, deliveryCost)}
                    displayType="text"
                    decimalScale={2}
                    prefix="৳"
                    thousandSeparator={true}
                    className="checkout__total__payment"
                  />
                </CardTitle>
                <hr />
                <CardTitle className="checkout__card__title">
                  <span>Select Payment Method</span>
                </CardTitle>
                <Form model="order">
                  <Row className="checkout__payment">
                    <Control.radio
                      model=".paymentMethod"
                      component={RadioButton}
                    />
                  </Row>
                  <Row className="checkout__button">
                    <Col xs="12" >
                      <Link style={{
                        width: "inherit"

                      }} to='/home'>
                        <Button className="checkout__button__confirm">
                          Confirm Order
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
            <>
              <Redirect to="/cart" />
            </>
          )
        }
      </Container>
    </div>

  )
}

export default Checkout;
