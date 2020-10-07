import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
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
import { LocalForm, Form, Control, Errors, Field } from 'react-redux-form';
import { UserContext } from '../Context/context';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import ReduxFormSelect from './ReduxFormSelect';
import CurrencyFormat from 'react-currency-format';
import { selectTotalPrice } from '../redux/cart';
import { defaultOrderByFn } from 'react-table';

const required = (val) => val && val.length;
const requiredObject = (val) => val && val.value && val.value.length
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const validMobile = (val) => (
  !val ? true : (
    val.substring(0, 3) === '+88' ? isMobilePhone(val) :
      (val.substring(0, 2) === '88' ? isMobilePhone("+" + val) :
        isMobilePhone("+88" + val)))
);
const isPostalCode = (val) => !val || val.match(/^[1-9][0-9]{3}$/)

const RadioButton = (props) => (
  <RadioGroup onChange={val => props.onChange(val)}>
    <FormControlLabel value="cashOnDelivery" control={<Radio size="small" />} label={<span style={{ fontSize: 'small', fontWeight: "500" }}>Cash On Delivery</span>} />
    <FormControlLabel value="onlinePayment" control={<Radio size="small" />} label={<span style={{ fontSize: 'small', fontWeight: "500" }}>Online Payment</span>} />
  </RadioGroup>
);

function Checkout({ cartProducts, deliveryCost, userInformation, postOrder, singleProduct, removeSingleProduct}) {

  const districts = [{ value: 'noakhali', label: "noakhali" }, {
    value: 'dhaka', label: "dhaka"
  }]

  let products;
  let totalCost;

  const history = useHistory();

  if (history.location.state){
    products = [singleProduct];
    totalCost = singleProduct.price + deliveryCost;
  }
  else {
    products = [...cartProducts];
    totalCost =  selectTotalPrice(cartProducts, deliveryCost);
  }

  const handleSubmit = (values) => {
    const fromBuy = history.location.state? true: false;

    postOrder({
      ...values,
      country: values.country.value,
      district: values.district.value,
      products: products,
      deliveryCost,
      totalCost: totalCost,
    }, fromBuy);
    removeSingleProduct();
    history.push('/home');
  }

  return (
    <div className="checkout">
      <Container className="checkout__container">
        {history.location.state || cartProducts.length !== 0 ? (
          <LocalForm validateOn="submit" model="order" onSubmit={(values) => handleSubmit(values)}>
            <Row className="checkout__row">
              <Col md="6" xl={{ size: "5", offset: "1" }} className="checkout__information">
                <Card className="checkout__card">
                  <CardBody className="checkout__card__body">
                    <CardTitle className="checkout__card__title">
                      <span>Shipping Information</span>
                    </CardTitle>

                    <Row className="form-group">
                      <Label htmlFor="name" md={3}>Name</Label>
                      <Col md={9}>
                        <Control.text model=".name" id="name" name="name"
                          placeholder="Name"
                          className="form-control"
                          defaultValue={userInformation.name}
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
                          defaultValue={userInformation.mobile}
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
                          defaultValue={{ "value": "bangladesh", "label": "Bangladesh" }}
                          component={ReduxFormSelect}
                          validators={{
                            requiredObject
                          }}
                        />
                        <Errors
                          className="text-danger"
                          model=".country"
                          show="touched"
                          messages={{
                            requiredObject: 'Required',
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Label htmlFor="district" md={3}>District</Label>
                      <Col md={9}>
                        <Control.select model=".district" id="district" name="district"
                          defaultValue={userInformation.district}
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
                          defaultValue={userInformation.thana}
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
                          defaultValue={userInformation.region}
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
                          defaultValue={userInformation.postalCode}
                          placeholder="Postal Code"
                          style={{
                            fontSize: "small"
                          }}
                          validators={{
                            // required, 
                            isPostalCode
                          }}
                        />

                        <Errors
                          className="text-danger"
                          model=".postalCode"
                          show="touched"
                          messages={{
                            // required: 'Required',
                            isPostalCode: "Invalid Postal Code"
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Label htmlFor="homeLocation" md={3}>Home Location</Label>
                      <Col md={9}>
                        <Control.text model=".homeLocation" id="homeLocation" name="homeLocation"
                          defaultValue={userInformation.homeLocation}
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
                    {/* <Row className="form-group">
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
                  </Row> */}

                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="5">
                <Card className="checkout__card">
                  <CardBody className="checkout__card__body">
                    <CardTitle className="checkout__card__title">
                      <span>Total Payment: </span>
                      <CurrencyFormat
                        value={totalCost}
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
                    <Row className="form-group checkout__payment">
                      <Control.radio
                        model=".paymentMethod"
                        component={RadioButton}
                        validators={{
                          required
                        }}
                      />
                    </Row>
                    <Errors
                      className="text-danger"
                      model=".paymentMethod"
                      show="touched"
                      messages={{
                        required: 'Required',
                      }}
                    />
                    <Row className="form-group checkout__button">
                      <Col xs="12" >
                        {/* <Link style={{
                          width: "inherit"

                        }} to='/home'> */}
                        <Button type="submit" className="checkout__button__confirm">
                          Confirm Order
                        </Button>
                        {/* </Link> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </LocalForm>
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
