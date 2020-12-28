import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import '../assets/css/Checkout.css';
import {
  Button,
  Card,
  CardBody,
  Row,
  Col, CardTitle, Container, Label, CardSubtitle 
} from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import isMobilePhone from 'validator/lib/isMobilePhone';
import ReduxFormSelect from './ReduxFormSelect';
import CurrencyFormat from 'react-currency-format';
import { selectTotalPrice } from '../redux/cart';
import { selectDistricts } from '../redux/districts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDistricts } from '../redux/actionCreators';
import { BKASH_MERCHANT_NUMBER } from '../shared/information';

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
const isPostalCode = (val) => !val || val.match(/^[1-9][0-9]{3}$/);

const getBkashCharge = (val) => val * 1.85 * 0.01

const RadioButton = (props) => (
  <RadioGroup onChange={val => props.onChange(val)}>
    <FormControlLabel value="bkash" control={<Radio size="small" />} label={<span style={{ fontSize: 'small', fontWeight: "500" }}>Bkash</span>} />
    <FormControlLabel value="cashOnDelivery" control={<Radio size="small" />} label={<span style={{ fontSize: 'small', fontWeight: "500" }}>Cash On Delivery</span>} />
    {/* <FormControlLabel value="onlinePayment" control={<Radio size="small" />} label={<span style={{ fontSize: 'small', fontWeight: "500" }}>Online Payment</span>} /> */}
  </RadioGroup>
);

function Checkout({ cartProducts, deliverySelect, userInformation, postOrder, singleProduct, removeSingleProduct, updateDeliveryCost, authenticated }) {

  const {districts, isLoading} = useSelector(state => state.districts)
  const districtsSelect = selectDistricts(districts);

  let products;
  let totalCost;

  const [isShown, setIsShown] = useState(false);

  const history = useHistory();

  if (history.location.state && singleProduct) {
    products = [{
      product: singleProduct.id,
      quantity: singleProduct.quantity,
      color: singleProduct.color
    }];
    totalCost = singleProduct.price * singleProduct.quantity + deliverySelect.deliveryCost;
  }
  else {
    products = [];
    for (let i = 0; i < cartProducts.length; i++) {
      products.push({
        product: cartProducts[i].id,
        quantity: cartProducts[i].quantity,
        color: cartProducts[i].color
      })
    }
    totalCost = selectTotalPrice(cartProducts, deliverySelect.deliveryCost);
  }

  const hasLoaded = useSelector(state => state.districts.hasLoaded);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!hasLoaded){
      dispatch(fetchDistricts());
    }
  }, [])
  const handleSubmit = (values) => {
    // console.log(values);
    let transactionId = '';
    if(values.paymentMethod === 'bkash')
      transactionId = values.transactionId;
    const fromBuy = history.location.state ? true : false;
    const shippingAddress = {
      customer: values.customer,
      mobile: values.mobile,
      country: values.country.value,
      district: values.district.value,
      thana: values.thana,
      region: values.region,
      postalCode: values.postalCode,
      homeLocation: values.homeLocation
    }
    postOrder({
      shippingAddress,
      products,
      payment: {
        method: values.paymentMethod,
        transactionId 
      }
    }, fromBuy, history, authenticated);
    // removeSingleProduct();
  }

  const requiredId = (val) => !isShown || (val && val.length);

  return (
    <div className="checkout">
      <Container className="checkout__container">
        {history.location.state || cartProducts.length !== 0 ? (
          <LocalForm validateOn="submit" model="order" validators={{
            '': {
              requiredTransactionId: (vals) => requiredId(vals.transactionId)
            }
          }} onSubmit={(values) => handleSubmit(values)}>
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
                        <Control.text model=".customer" id="name" name="name"
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
                          defaultValue={{ "value": userInformation.address.country, "label": userInformation.address.country }}
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
                          defaultValue={deliverySelect}
                          className="form-control"
                          validators={{
                            requiredObject
                          }}
                          placeholder="Search your district..."
                          component={ReduxFormSelect}
                          isLoading={isLoading}
                          updateDeliveryCost={updateDeliveryCost}
                          options={districtsSelect}
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
                          defaultValue={userInformation.address.thana}
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
                          defaultValue={userInformation.address.region}
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
                          defaultValue={userInformation.address.postalCode && userInformation.address.postalCode.toString()}
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
                          defaultValue={userInformation.address.homeLocation}
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
                      <span>Payment Summary</span>
                    </CardTitle>
                    <CardSubtitle className="checkout__card__subtitle mb-2">
                      <span>Subtotal: </span>
                      <CurrencyFormat
                        value={totalCost - deliverySelect.deliveryCost}
                        displayType="text"
                        decimalScale={2}
                        prefix="৳"
                        thousandSeparator={true}
                        className="checkout__total__payment"
                      />

                    </CardSubtitle>
                    <CardSubtitle className="checkout__card__subtitle mb-3">
                      <span>Delivery Cost: </span>
                      <CurrencyFormat
                        value={deliverySelect.deliveryCost}
                        displayType="text"
                        decimalScale={2}
                        prefix="৳"
                        thousandSeparator={true}
                        className="checkout__total__payment"
                      />

                    </CardSubtitle>
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
                        // getValue={(e) => {
                        //   if (e.target.value === 'bkash') {
                        //     setIsShown(true);
                        //   } else {
                        //     setIsShown(false)
                        //   }
                        // }}
                        onChange={(e) => {
                          // console.log(e.target.value)
                          if(e.target.value === 'bkash'){
                            setIsShown(true);
                          } else setIsShown(false)
                        }}
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
                    <Row className="form-group" hidden={!isShown}>
                      <Label htmlFor="transactionId" xs={12}>Please send total <CurrencyFormat
                        value={totalCost}
                        displayType="text"
                        decimalScale={2}
                        prefix="৳"
                        thousandSeparator={true}
                        className="checkout__total__payment"
                      /> + <CurrencyFormat
                          value={getBkashCharge(totalCost)}
                          displayType="text"
                          decimalScale={2}
                          prefix="৳"
                          thousandSeparator={true}
                          className="checkout__total__payment"
                        /> (Bkash Charge) = <CurrencyFormat
                          value={totalCost + getBkashCharge(totalCost)}
                          displayType="text"
                          decimalScale={2}
                          prefix="৳"
                          thousandSeparator={true}
                          className="checkout__total__payment"
                        /> to <span className="checkout__total__payment">{BKASH_MERCHANT_NUMBER}</span> and then write the transaction id below</Label>
                      <Col xs={12}>
                        <Control.text model=".transactionId" id="transactionId" name="transactionId"
                          className="form-control"
                          placeholder="Transaction ID"
                          style={{
                            fontSize: "small"
                          }}
                          validators={{

                          }}
                        />
                        <Errors
                          className="text-danger"
                          model="."
                          show="touched"
                          messages={{
                            // requireId: 'Required'
                            requiredTransactionId: 'Please write the transaction ID'
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="form-group checkout__button">
                      <Col xs="12" >
                        {/* <Link style={{
                          width: "inherit"

                        }} to='/'> */}
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
