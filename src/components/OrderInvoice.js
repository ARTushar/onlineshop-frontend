import React from 'react';
import '../assets/css/OrderInvoice.css';
import { Container, Row, Col, Table } from 'reactstrap';
import OrderTotal from './OrderTotal';
import OrderProductSmall from './OrderProductSmall';
import OrderProduct from './OrderProduct';
import { Redirect } from 'react-router-dom';

function OrderInvoice({ order_no, orders, reviewPosted, postReview, clearReviewPosted }) {
  const  order = orders.filter(order => order._id == order_no)[0];


  if (order) {
    return (
      <div className='orderinvoice'>
        <Container className='orderinvoice__container'>
          <Row className='orderinvoice__heading'>
            <span>Ordered Products: </span>
          </Row>
          <Row className='orderinvoice__row'>
            <Col xs='12' lg='8' className='orderinvoice__products'>
              <div className='orderinvoice__products__header d-sm-none'>
                {order.products.map((orderproduct) => (
                  <OrderProductSmall
                    key={orderproduct.product._id}
                    id={orderproduct.product._id}
                    slug={orderproduct.product.slug}
                    image={orderproduct.product.images[0].image}
                    title={orderproduct.product.title}
                    price={orderproduct.product.price / 100}
                    discount={orderproduct.product.discount}
                    q={orderproduct.quantity}
                    orderId={order_no}
                    reviewPosted={reviewPosted}
                    postReview={postReview}
                    clearReviewPosted={clearReviewPosted}
                    orderStatus={order.status}
                  />
                ))}
              </div>
              <Table className='d-none d-sm-block'>
                <thead>
                  <tr>
                    <th></th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((orderproduct) => (
                    <OrderProduct
                      key={orderproduct.product._id}
                      id={orderproduct.product._id}
                      slug={orderproduct.product.slug}
                      image={orderproduct.product.images[0].image}
                      title={orderproduct.product.title}
                      price={orderproduct.product.price / 100}
                      discount={orderproduct.product.discount}
                      q={orderproduct.quantity}
                      orderId={order_no}
                      reviewPosted={reviewPosted}
                      postReview={postReview}
                      clearReviewPosted={clearReviewPosted}
                      orderStatus={order.status}
                    />
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col lg='4' className='orderinvoice__totals'>
              <OrderTotal order={order} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <Redirect to="/profile" />
    );
  }
}

export default OrderInvoice;
