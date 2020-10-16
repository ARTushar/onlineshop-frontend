import React from 'react';
import { Container, Input, Row, Col, Button } from 'reactstrap';
import '../assets/css/CartTotal.css';
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/context';
import { selectSubTotalPrice } from '../redux/cart';
import CurrencyFormat from 'react-currency-format';


function CartTotal() {

  const cartContext = React.useContext(CartContext);
  const deliveryCost = cartContext.deliveryCost;
  const updateDeliveryCost = cartContext.updateDeliveryCost;
  const subTotal = selectSubTotalPrice(cartContext.cartProducts);
  const districts = {
    'Dhaka': 60,
    'Chittangong': 100,
    'Noakhali': 100,
    'Feni': 90
  };
  const [deliveryDistrict, setDeliveryDistrict] = React.useState('Dhaka');

  const setCurrentDistrict = (e) => {
    setDeliveryDistrict(e.target.value);
    updateDeliveryCost(districts[e.target.value])
  }


  return (
    <div className="carttotal">
      <Container className="carttotal__container">
        <Row className="carttotal__heading">
          <span>Cart Total</span>
        </Row>
        <hr />
        <Row className="carttotal__subtotal">
          <Col xs="3" className="carttotal__subtotal__heading">
            <span>Subtotal</span>
          </Col>
          <Col className="carttotal__subtotal__cost">
            <CurrencyFormat
              decimalScale={2}
              thousandSeparator={true}
              value={subTotal}
              displayType={"text"}
              prefix="৳"
            />
          </Col>
        </Row>
        <hr />
        <Row className="carttotal__shipping">
          <Col xs="3" className="carttotal__shipping__heading">
            <span>Shipping</span>
          </Col>
          <Col xs="" className="carttotal__shipping__info__col">
            <Row className="carttotal__shipping__info">
              <Col xs="12" className="carttotal__shipping__cost">
                <span className="carttotal__shipping__cost__heading">Home Delivery: </span>
                <span className="carttotal__shipping__cost__value">৳{deliveryCost}</span>
              </Col>
              <Col xs="12" className="carttotal__shipping__to">
                <span>Shipping to: </span>
              </Col>
              <Col className="carttotal__shipping__location">
                <Input
                  type="select"
                  placeholder="Select delivery location"
                  onChange={setCurrentDistrict}
                  className="carttotal__shipping__location__select"
                >
                  {Object.keys(districts).map(district =>
                    <option className="carttotal__shipping__location__option">{district}</option>
                  )}
                </Input>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="carttotal__total">
          <Col xs="3" className="carttotal__total__heading">
            <span>Total</span>
          </Col>
          <Col className="carttotal__total__cost">

            <CurrencyFormat
              decimalScale={2}
              value={subTotal + deliveryCost}
              displayType={"text"}
              prefix="৳"
              thousandSeparator={true}
            />
          </Col>
          <Col xs="12" className="cart__button">
            <Link style={{
              width: "inherit"

            }} to='/checkout'>
              <Button className="cart__button__select">
                Proceed to Checkout
                        </Button>
            </Link>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default CartTotal;
