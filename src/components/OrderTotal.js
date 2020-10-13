import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../assets/css/OrderTotal.css';
import CurrencyFormat from 'react-currency-format';


function OrderTotal({order}) {

  const subTotal = order.subTotalCost;
  const shippingAddress = order.shippingAddress.homeLocation + ", " + order.shippingAddress.region + ", " +
    order.shippingAddress.thana + ", " + order.shippingAddress.district + (order.shippingAddress.postalCode? ("-" + order.shippingAddress.postalCode): "") + ", " + order.shippingAddress.country;

  return (
    <div className="ordertotal">
      <Container className="ordertotal__container">
        <Row className="ordertotal__heading">
          <span>Order Summary ({order._id})</span>
        </Row>
        <hr />
        <Row className="ordertotal__name">
          <Col xs={3} lg={4} className="ordertotal__name__heading">
            <span>Name</span>
          </Col>
          <Col xs={9} lg={8} className="ordertotal__name__value">
            <span>
              {order.shippingAddress.customer}
            </span>
          </Col>
        </Row>
        <hr />
        {/* <Row className="ordertotal__name">
          <Col xs="3" className="ordertotal__name__heading">
            <span>Delivery Notes</span>
          </Col>
          <Col className="ordertotal__name__value">
            <span>
              {order.delivery_notes}
            </span>
          </Col>
        </Row> */}
        <Row className="ordertotal__subtotal">
          <Col xs={3} lg={4} className="ordertotal__subtotal__heading">
            <span>Subtotal</span>
          </Col>
          <Col xs={9} lg={8} className="ordertotal__subtotal__cost">
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
        <Row className="ordertotal__delivery">
          <Col xs={3} lg={4} className="ordertotal__delivery__heading">
            <span>Delivery Cost</span>
          </Col>
          <Col xs={9} lg={8} className="ordertotal__delivery__value">
            <span>৳{order.deliveryCost}</span>
          </Col>
        </Row>
        <hr />
        <Row className="ordertotal__total">
          <Col xs={3} lg={4} className="ordertotal__total__heading">
            <span>Total</span>
          </Col>
          <Col xs={9} lg={8} className="ordertotal__total__cost">

            <CurrencyFormat
              decimalScale={2}
              value={subTotal + order.deliveryCost}
              displayType={"text"}
              prefix="৳"
              thousandSeparator={true}
            />
          </Col>
        </Row>
        <hr />
        <Row className="ordertotal__shipping">
          <Col xs={3} lg={4} className="ordertotal__shipping__heading">
            <span>Shipping Address</span>
          </Col>
          <Col xs={9} lg={8} className="ordertotal__shipping__value">
                <span>{shippingAddress}</span>
          </Col>
        </Row>
        <hr />
        <Row className="ordertotal__payment">
          <Col xs="3" className="ordertotal__payment__heading">
            <span>Payment Method</span>
          </Col>
          <Col className="ordertotal__payment__value">
            <span>{order.payment.method}</span>
          </Col>
        </Row>
        <hr />
        {/* {order.payment.transactionId ? (
          // <>
            <Row className="ordertotal__payment">
              <Col xs="3" className="ordertotal__payment__heading">
                <span>Transaction ID</span>
              </Col>
              <Col className="ordertotal__payment__value">
                <span>{order.payment.transactionId}</span>
              </Col>
            </Row>
            // <hr />
          ) :
          ({})
        } */}
        <Row className="ordertotal__status">
          <Col xs="3" className="ordertotal__status__heading">
            <span>Order Status</span>
          </Col>
          <Col className="ordertotal__status__value">
            <span>{order.status}</span>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default OrderTotal;
