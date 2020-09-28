import React from 'react';
import { Button, Row, Col, InputGroup, Input } from 'reactstrap';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import '../assets/css/CartProductSmall.css';


function CartProductSmall({ image, title, price, q, maxq }) {
    const [quantity, setQuantity] = React.useState(q);

    const getValue = (val) => (
        val <= 0 ? 0 :
            (val >= maxq ? maxq : val)
    );

    return (
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
                        <a role="button" className="cartproductsmall__remove__button">
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
                        ৳ {price}
                    </Col>
                </Row>
                <Row className="cartproductsmall__content">
                    <Col xs="6" className="cartproductsmall__heading">
                        <span>QUANTITY</span>
                    </Col>
                    <Col xs="6" className="cartproductsmall__quantity">
                        <InputGroup className="cartproductsmall__quantity__group">
                            <Button className="cartproductsmall__quantity__button" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</Button>
                            <Input onChange={e => setQuantity(getValue(e.target.value.replace(/\D/, '')))} className="cartproductsmall__quantity__value" value={quantity} />
                            <Button className="cartproductsmall__quantity__button" onClick={() => setQuantity(quantity == maxq ? quantity : quantity + 1)}>+</Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="cartproductsmall__content">
                    <Col xs="6" className="cartproductsmall__heading">
                        SUBTOTAL
                    </Col>
                    <Col className="cartproductsmall__subtotal">
                        ৳ {price * quantity}
                    </Col>

                </Row>
            </Col>
        </Row>
    )
}

export default CartProductSmall;