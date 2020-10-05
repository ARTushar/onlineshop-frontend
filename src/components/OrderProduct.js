import React from 'react';
import '../assets/css/OrderProduct.css';
import CurrencyFormat from 'react-currency-format';

function OrderProduct({ id, image, title, price, q, slug }) {

  return (
    <tr className="orderproduct">
      <td className="orderproduct__thumbnail">
        <img
          src={image}
          alt="product image"
          className=""
        />
      </td>
      <td className="orderproduct__title">
        {title}
      </td>
      <td className="orderproduct__price">
        <CurrencyFormat
          value={price}
          decimalScale={2}
          displayType="text"
          thousandSeparator={true}
          prefix="৳"
        />
      </td>
      <td className="orderproduct__quantity">
        <span>{q}</span>
      </td>
      <td className="orderproduct__subtotal">
        <CurrencyFormat
          value={price * q}
          decimalScale={2}
          displayType="text"
          prefix="৳"
          thousandSeparator={true}
        />
      </td>
    </tr>
  )
}

export default OrderProduct;
