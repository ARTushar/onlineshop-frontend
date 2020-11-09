import React  from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import '../assets/css/CartTotal.css';
import { Link } from 'react-router-dom'
import { CartContext } from '../utils/context';
import { selectSubTotalPrice } from '../redux/cart';
import { selectDistricts } from '../redux/districts';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import Select from 'react-select';

function CartTotal() {

  const cartContext = React.useContext(CartContext);
  const deliverySelect = cartContext.deliverySelect;
  const updateDeliveryCost = cartContext.updateDeliveryCost;
  const subTotal = selectSubTotalPrice(cartContext.cartProducts);
  const {districts, isLoading} = useSelector(state => state.districts)
  const districtsSelect = selectDistricts(districts);

  const handleDeliveryCost = (v) => {
    updateDeliveryCost(v);
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
                <span className="carttotal__shipping__cost__value">৳{deliverySelect.deliveryCost}</span>
              </Col>
              <Col xs="12" className="carttotal__shipping__to">
                <span>Shipping to: </span>
              </Col>
              <Col xs="12" className="carttotal__shipping__location">
                <Select
                  options={districtsSelect}
                  isSearchable
                  isLoading={isLoading}
                  defaultValue={deliverySelect}
                  onChange={handleDeliveryCost}
                  className="carttotal__shipping__location__select"
                />
                {/* <Input
                  type="select"
                  placeholder="Select delivery location"
                  onChange={setCurrentDistrict}
                  className="carttotal__shipping__location__select"
                >
                  {districts.map(district =>
                    <option className="carttotal__shipping__location__option">{district.name}</option>
                  )}
                  
                </Input> */}
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
              value={subTotal + deliverySelect.deliveryCost}
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
