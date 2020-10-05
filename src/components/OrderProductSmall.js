import React from 'react';
import { Row, Col } from 'reactstrap';
import '../assets/css/OrderProductSmall.css';
import CurrencyFormat from 'react-currency-format';


function OrderProductSmall({ id, image, title, price, q, maxq }) {

  return (
    <>
      <Row className="orderproductsmall">
        <Col xs="3" className="orderproductsmall__thumbnail">
          <img
            src={image}
            alt="product image"
            className=""
          />
        </Col>
        <Col>
          <Row className="orderproductsmall__content">
            <Col xs="10" className="orderproductsmall__title">
              {title}
            </Col>
          </Row>
          <Row className="orderproductsmall__content">
            <Col xs="6" className="orderproductsmall__heading">
              PRICE
                    </Col>
            <Col xs="6" className="orderproductsmall__price">
              <CurrencyFormat
                value={price}
                decimalScale={2}
                displayType="text"
                prefix="৳"
                thousandSeparator={true}
              />
            </Col>
          </Row>
          <Row className="orderproductsmall__content">
            <Col xs="6" className="orderproductsmall__heading">
              <span>QUANTITY</span>
            </Col>
            <Col xs="6" className="orderproductsmall__quantity">
              <span>{q}</span>
            </Col>
          </Row>

          <Row className="orderproductsmall__content">
            <Col xs="6" className="orderproductsmall__heading">
              SUBTOTAL
                    </Col>
            <Col className="orderproductsmall__subtotal">
              <CurrencyFormat
                value={price * q}
                decimalScale={2}
                displayType="text"
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

export default OrderProductSmall;