import React from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import '../assets/css/CartProduct.css';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';

function CartProduct({image, title, price, q, maxq}) {

    const [quantity, setQuantity] = React.useState(q);

    const getValue = (val) => (
        val <= 0 ? 0 :
            (val >= maxq ? maxq : val)
    );

    return (
        <tr className="cartproduct">
            <td className="cartproduct__remove">
                <a role="button" className="cartproduct__remove__button">
                    <RemoveCircleSharpIcon style={{
                        color: "secondary",
                    }} className="cartproduct__remove__icon" />
                </a>
            </td>
            <td className="cartproduct__thumbnail">
                <img
                    src={image}
                    alt="product image"
                    className=""
                />
            </td>
            <td className="cartproduct__title">
                {title}
            </td>
            <td className="cartproduct__price">
                <span>৳ {price}</span>
            </td>
            <td className="cartproduct__quantity">
                <InputGroup className="cartproduct__quantity__group">
                        <Button className="cartproduct__quantity__button" onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</Button>
                    <Input onChange={e => setQuantity(getValue(e.target.value.replace(/\D/, '')))} className="cartproduct__quantity__value" value={quantity} />
                        <Button className="cartproduct__quantity__button" onClick={() => setQuantity(quantity == maxq ? quantity : quantity + 1)}>+</Button>
                </InputGroup>
            </td>
            <td className="cartproduct__subtotal">
                ৳ {price * quantity}
            </td>

            {/* <Col md="" */}
        </tr>
    )
}

export default CartProduct
