import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import '../assets/css/Cart.css';
import CartTotal from './CartTotal';
import CartProduct from './CartProduct';
import CartProductSmall from './CartProductSmall';


function Cart() {
    return (
        <div className='cart'>
            <Container className="cart__container">
                <Row className="cart__row">
                    <Col xs="12" lg="7" className="cart__products">
                        <div className="cart__products__header d-sm-none">
                            <CartProductSmall 
                            image="images/products/handBag.jpg"
                            title="Brown color bag beautiful awesome "
                            price="180"
                            q={2}
                            maxq={12}
                            />
                            <hr />
                            <CartProductSmall 
                            image="images/products/handBag.jpg"
                            title="Brown color bag beautiful awesome "
                            price="180"
                            q={2}
                            maxq={12}
                            />
                        </div>
                        <Table className="d-none d-sm-block">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>PRODUCT</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>SUBTOTAL</th>
                                </tr>
                            </thead>
                        <CartProduct
                            image="images/products/handBag.jpg"
                            title="Brown color bag beautiful awesome "
                            price="180"
                            q={2}
                            maxq={12}
                        />
                        <CartProduct
                            image="images/products/handBag.jpg"
                            title="Brown color bag beautiful awesome "
                            price="180"
                            q={2}
                            maxq={12}
                        />
                        </Table>
                    </Col>
                    <Col lg="5" className="cart__totals">
                        <CartTotal />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Cart;