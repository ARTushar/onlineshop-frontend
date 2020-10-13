import React from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import '../assets/css/Cart.css';
import CartTotal from './CartTotal';
import CartProduct from './CartProduct';
import CartProductSmall from './CartProductSmall';
import { CartContext } from '../Context/context';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';


function Cart() {
  const cartProducts = React.useContext(CartContext).cartProducts;
  return (
    <div className='cart'>
      <Container className="cart__container">

        {cartProducts.length !== 0 ? (
          <Row className="cart__row">
            <Col xs="12" lg="7" className="cart__products">
              <div className="cart__products__header d-sm-none">
                {cartProducts.map(cartproduct => (
                  <CartProductSmall
                    id={cartproduct.id}
                    image={cartproduct.image}
                    title={cartproduct.title}
                    price={cartproduct.price}
                    q={cartproduct.quantity}
                    maxq={12}
                  />
                ))}
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

                {cartProducts.map(cartproduct => (
                  <CartProduct
                    id={cartproduct.id}
                    image={cartproduct.image}
                    title={cartproduct.title}
                    price={cartproduct.price}
                    q={cartproduct.quantity}
                    maxq={12}
                  />
                ))}
              </Table>

            </Col>
            <Col lg="5" className="cart__totals">
              <CartTotal />
            </Col>
          </Row>
        ) : (<>
          <div className="cart__no__product">
            <RemoveShoppingCartIcon style={{ textAlign: "center", fontSize: "100px" }} />
          </div>
          <Row className="cart__no__product__message">
            <span>NO PRODUCTS IN THE CART <span role="img" aria-label="Not satisfied">😒</span></span>
          </Row>
          <Row className="justify-content-center">
            <Button role="a" href="/home" className="cart__no__product__button">
              RETURN TO SHOP
                                </Button>
          </Row>
        </>
          )
        }


      </Container>
    </div>
  )
}

export default Cart;