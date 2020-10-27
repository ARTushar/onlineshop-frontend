import React from 'react';
import { Button, Row, Col, InputGroup, Input } from 'reactstrap';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import '../assets/css/CartProductSmall.css';
import { CartContext } from '../Context/context';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { setAlertMessage } from '../redux/actionCreators';


function CartProductSmall({ id, image, title, price, q, maxq }) {
  const cartContext = React.useContext(CartContext);

  const getValue = (val) => (
    val <= 1 ? 1 :
      (val >= maxq ? maxq : val)
  );

  const dispatch = useDispatch();

  const handleProductRemove = () => {
    cartContext.removeFromCart(id);
    dispatch(setAlertMessage('😭 You have removed the selected product from the cart!', 'warning', true));
  }

  return (
    <>
      <Row className="cartproductsmall">
        <Col xs="3" className="cartproductsmall__thumbnail">
          <img
            src={image}
            alt="product image"
            className=""
          />
        </Col>
        <Col>
          <Row className="cartproductsmall__content">
            <Col xs="10" className="cartproductsmall__title">
              {title}
            </Col>
            <Col xs="2" className="cartproductsmall__remove">
              <a role="button" onClick={handleProductRemove} className="cartproductsmall__remove__button">
                <RemoveCircleSharpIcon style={{
                  color: "secondary",
                }} className="cartproductsmall__remove__icon" />
              </a>
            </Col>
          </Row>
          <Row className="cartproductsmall__content">
            <Col xs="6" className="cartproductsmall__heading">
              PRICE
                    </Col>
            <Col xs="6" className="cartproductsmall__price">
              {/* ৳{price} */}
              <CurrencyFormat
                value={price}
                decimalScale={2}
                displayType="text"
                type="text"
                prefix="৳"
                thousandSeparator={true}
              />
            </Col>
          </Row>
          <Row className="cartproductsmall__content">
            <Col xs="6" className="cartproductsmall__heading">
              <span>QUANTITY</span>
            </Col>
            <Col xs="6" className="cartproductsmall__quantity">
              <InputGroup className="cartproductsmall__quantity__group">
                <Button className="cartproductsmall__quantity__button" onClick={() => cartContext.updateQuantity(id, q > 1 ? q - 1 : 1)}>-</Button>
                <Input onChange={e => cartContext.updateQuantity(id, getValue(e.target.value.replace(/\D/, '')))} className="cartproductsmall__quantity__value" value={q} />
                <Button className="cartproductsmall__quantity__button" onClick={() => cartContext.updateQuantity(id, q == maxq ? q : q + 1)}>+</Button>
              </InputGroup>
            </Col>
          </Row>

          <Row className="cartproductsmall__content">
            <Col xs="6" className="cartproductsmall__heading">
              SUBTOTAL
                    </Col>
            <Col className="cartproductsmall__subtotal">
              {/* ৳{price * q} */}
              <CurrencyFormat
                value={price * q}
                decimalScale={2}
                displayType="text"
                type="text"
                prefix="৳"
                thousandSeparator={true}
              />
            </Col>

          </Row>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default CartProductSmall;