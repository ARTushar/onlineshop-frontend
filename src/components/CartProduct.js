import React from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import '../assets/css/CartProduct.css';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import { CartContext } from '../Context/context';
import CurrencyFormat from 'react-currency-format';

function CartProduct({id, image, title, price, q, maxq}) {

    // const [quantity, setQuantity] = React.useState(q);

    const cartContext = React.useContext(CartContext);

    const getValue = (val) => (
        val <= 1 ? 1 :
            (val >= maxq ? maxq : val)
    );

    return (
        <tr className="cartproduct">
            <td className="cartproduct__remove">
                <a onClick={()=> cartContext.removeFromCart(id)} role="button" className="cartproduct__remove__button">
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
                 {/* <span>{price}</span> */}
                <CurrencyFormat 
                    value={price}
                    decimalScale={2}
                    displayType="text"
                    type="text"
                    thousandSeparator={true}
                    prefix="৳"
                />
            </td>
            <td className="cartproduct__quantity">
                <InputGroup className="cartproduct__quantity__group">
                    <Button className="cartproduct__quantity__button" onClick={() => cartContext.updateQuantity(id, q > 1 ? q - 1 : 1)}>-</Button>
                    <Input onChange={e => cartContext.updateQuantity(id, getValue(e.target.value.replace(/\D/, '')))} className="cartproduct__quantity__value" value={q} />
                    <Button className="cartproduct__quantity__button" onClick={() => cartContext.updateQuantity(id, q == maxq ? q : q + 1)}>+</Button>
                </InputGroup>
            </td>
            <td className="cartproduct__subtotal">
                {/* ৳ {Number.parseFloat(price * q).toFixed(2)} */}
                <CurrencyFormat 
                    value={price * q}
                    decimalScale={2}
                    displayType="text"
                    type="text"
                    prefix="৳"
                    thousandSeparator={true}
                />
            </td>
        </tr>
    )
}

export default CartProduct
