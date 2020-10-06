import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, InputGroup, Input } from 'reactstrap';
import '../assets/css/ProductDetails.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CartContext } from '../Context/context';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';

function ProductDetails({ selectedProduct, addToWishlist }) {
  const maxq = 12;
  const [quantity, setQuantity] = React.useState(1);
  const cartContext = React.useContext(CartContext);
  const history = useHistory();

  const getValue = (val) => (
    val <= 1 ? 1 :
      (val >= maxq ? maxq : val)
  );

  const discountPrice = selectedProduct?.price -
                      selectedProduct?.price * selectedProduct?.discount * 0.01;

  const handleBuy = () => {
    cartContext.addSingleProduct({
      id: selectedProduct.id,
      price: discountPrice,
      title: selectedProduct.title,
      image: selectedProduct.image,
      quantity: quantity
    })
    history.push({
      pathname: '/checkout',
      state: { fromBuy: true }
    });
  }

return (
  <div className='productDetails'>
    <Container className='productDetails__container'>
      <Row className='productDetails__toprow'>
        <Col md='4' className='productDetails__toprow__imagebox'>
          <img
            src={selectedProduct && selectedProduct.image}
            className='productDetails__toprow__image'
            alt='product image'
          ></img>
        </Col>
        <Col className='productDetails__toprow__titlebox'>
          <Container>
            <Row>
              <h4 className='productDetails__toprow__titlebox__title'>
                {selectedProduct && selectedProduct.title}
              </h4>
            </Row>
            <Row className='productDetails__toprow__titlebox_rating'>
              {Array(selectedProduct && selectedProduct.rating)
                .fill()
                .map((_, i) => (
                  <p>🌟</p>
                ))}
            </Row>
            <Row className='productDetails__toprow__titlebox_pricerow'>
              <Col sm={3} md={4} lg={3} className="p-0">
                <strong className='productDetails__toprow__titlebox_originalprice'>
                  {/* ৳{selectedProduct && selectedProduct.price} */}
                  <CurrencyFormat
                    decimalScale={2}
                    thousandSeparator={true}
                    value={selectedProduct ?
                      selectedProduct.price : 0}
                    displayType={"text"}
                    prefix="৳"
                  />
                </strong>
                <strong className='productDetails__toprow__titlebox__discount'>
                  -{selectedProduct && selectedProduct.discount}%
									</strong>
              </Col>
              <Col xs={4} sm={2} md={3} lg={3} className="p-0">
                <strong className='productDetails__toprow__titlebox_discountprice'>
                  {/* ৳
										{selectedProduct &&
                      selectedProduct.price -
                      selectedProduct.price * selectedProduct.discount * 0.01} */}
                  <CurrencyFormat
                    decimalScale={2}
                    thousandSeparator={true}
                    value={selectedProduct ?
                      selectedProduct.price -
                      selectedProduct.price * selectedProduct.discount * 0.01 : 0}
                    displayType={"text"}
                    prefix="৳"
                  />
                </strong>
              </Col>
              <Col xs={8} sm={5} className="p-0">

                <FavoriteIcon style={{ alignSelf: "center" }} color="secondary" ></FavoriteIcon>
                <Button onClick={() => addToWishlist({
                  id: selectedProduct.id,
                  price: selectedProduct.price,
                  title: selectedProduct.title,
                  image: selectedProduct.image,
                  slug: selectedProduct.slug,
                  discount: selectedProduct.discount,
                  rating: selectedProduct.rating
                })}
                  size='sm'
                  className='productDetails__toprow__titlebox__buttonwish'
                >
                  ADD TO WISHLIST
								</Button>
              </Col>
            </Row>
            <Row className='productDetails__toprow__titlebox__quantityrow'>
              <span>
                Quantity:{' '}
              </span>
              <InputGroup className="productDetails__quantity__group">
                <Button className="productDetails__quantity__button" onClick={() => quantity - 1 && setQuantity(quantity - 1)}>-</Button>
                <Input onChange={e => setQuantity(getValue(e.target.value.replace(/\D/, '')))} className="productDetails__quantity__value" value={quantity} />
                <Button className="productDetails__quantity__button" onClick={() => setQuantity(quantity == maxq ? quantity : quantity + 1)}>+</Button>
              </InputGroup>
            </Row>

            <Row className='productDetails__toprow__titlebox__buyrow'>
              <Button onClick={() => cartContext.addToCart({
                id: selectedProduct.id,
                price: discountPrice,
                title: selectedProduct.title,
                image: selectedProduct.image,
                quantity: quantity
              })}
                className='productDetails__toprow__titlebox__buttoncart'
              >
                ADD TO CART
								</Button>
              <Button
                onClick={() => handleBuy()}
                className='productDetails__toprow__titlebox__buttonbuy shadow'
              >
                BUY NOW
								</Button>
            </Row>
            <Row>
              <text className='productDetails__toprow__titlebox__category'>
                <span>Category: </span>
                <span className="productDetails__less__font">{selectedProduct && selectedProduct.category}</span>
              </text>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row className='productDetails__description'>
        <Col>
          <Container className='productDetails__description__container'>
            <h4 style={{ marginTop: 10, fontSize: "medium" }}>
              {selectedProduct && selectedProduct.description.header}
            </h4>
            <hr></hr>
            <h6>Product features:</h6>
            <ul className="productDetails__less__font">
              {selectedProduct &&
                selectedProduct.description.features.map((feature) => {
                  return <li>{feature}</li>;
                })}
            </ul>
            <hr></hr>
            <h6>Product specifications:</h6>
            <ul className="productDetails__less__font">
              {selectedProduct &&
                selectedProduct.description.specifications.map((spec) => {
                  return <li>{spec}</li>;
                })}
            </ul>
          </Container>
        </Col>
      </Row>

      <Row className='productDetails__QA'>
        <Col>
          <Container className='productDetails__QA__container'>
            <h4 style={{ marginTop: 10, fontSize: "medium" }}>Questions about this product</h4>
            <hr></hr>
            {selectedProduct &&
              selectedProduct.questionAns.map((qa) => {
                return (
                  <React.Fragment>
                    <Row>
                      <Col xs='2'>Q:</Col>
                      <Col xs='8'>{qa.q}</Col>
                    </Row>
                    <Row>
                      <Col xs='2'>A:</Col>
                      <Col xs='8'>{qa.a}</Col>
                    </Row>
                    <hr></hr>
                  </React.Fragment>
                );
              })}
          </Container>
        </Col>
      </Row>

      <Row className='productDetails__review'>
        <Col>
          <Container className='productDetails__review__container'>
            <h4 style={{ marginTop: 10, fontSize: "medium" }}>Reviews</h4>
            <hr></hr>
            {selectedProduct &&
              selectedProduct.reviews.map((rev) => {
                return (
                  <React.Fragment>
                    <Row style={{ marginLeft: 5 }}>
                      {Array(rev.rating)
                        .fill()
                        .map((_, i) => (
                          <p>🌟</p>
                        ))}
                    </Row>
                    <Row>
                      <Col>by {rev.user}</Col>
                    </Row>
                    <Row>
                      <Col>{rev.comment}</Col>
                    </Row>
                    <hr></hr>
                  </React.Fragment>
                );
              })}
          </Container>
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default ProductDetails;
