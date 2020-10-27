import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, InputGroup, Input } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

import ProductDetailsReviewsAndRatings from './ProductDetailsReviewsAndRatings';
import ProductDetailsFeaturedImages from './ProductDetailsFeaturedImages';

import { CartContext } from '../Context/context';
import CurrencyFormat from 'react-currency-format';
import { useHistory, Link, useLocation } from 'react-router-dom';

import '../assets/css/ProductDetails.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import StarIcon from '@material-ui/icons/Star';
import CustomizedSnackbar from './CustomizedSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessage } from '../redux/actionCreators';

const required = (val) => val && val.length;

function ProductDetails({ selectedProduct, addToWishlist }) {
  const maxq = 12;
  const [quantity, setQuantity] = React.useState(1);
  const [colorFamilyImageIndex, setColorFamilyImageIndex] = React.useState(0);
  const cartContext = React.useContext(CartContext);
  const history = useHistory();
  const [askQuestionButtonState, setAskQuestionButtonState] = useState(false);
  const location = useLocation();

  const handleColorFamilyChange = (image) => {
    selectedProduct.images.map((img, idx) => {
      if (img.color == image.color) {
        setColorFamilyImageIndex(idx);
      }
    })
  };

  const handleAskQuestion = (newQuestion) => {
    setAskQuestionButtonState(!askQuestionButtonState);
    cartContext.postQuestion(newQuestion, selectedProduct._id)
  };

  useEffect(() => {
    if (cartContext.slug !== cartContext.currentSlug) {
      cartContext.setCurrentSlug(cartContext.slug);
      cartContext.fetchProductDetails(cartContext.slug);
    }

    if (cartContext.questionPosted) {
      // alert("Yay your question is posted");
      console.log('yay posted');
      cartContext.clearQuestionPosted();
      
    }
  }, [])

  const getValue = (val) => (val <= 1 ? 1 : val >= maxq ? maxq : val);

  const discountPrice =
    selectedProduct?.price -
    selectedProduct?.price * selectedProduct?.discount * 0.01;
  
  const handleWishList = () => {
    if (cartContext.wishList.filter(product => product._id === selectedProduct._id).length === 0) {
      addToWishlist({
        id: selectedProduct._id,
        price: selectedProduct.price,
        title: selectedProduct.title,
        images: selectedProduct.images,
        slug: selectedProduct.slug,
        discount: selectedProduct.discount,
        rating: selectedProduct.rating,
      })
    }
  }

  const cartProducts = useSelector(state => state.cart.products)
  const dispatch = useDispatch();

  const handleCart = () => {
    if (cartProducts.filter((product) => product.id === selectedProduct.id).length === 0) {
      cartContext.addToCart({
        id: selectedProduct._id,
        price: discountPrice,
        title: selectedProduct.title,
        image: selectedProduct.images[0].image,
        quantity: quantity,
      })
      dispatch(setAlertMessage('Yay! this product has been added to the cart!', 'success', true))
    } else {
      dispatch(setAlertMessage('Huh! this product is already in the cart!', 'error', true))
    }
  }

  const handleBuy = () => {
    cartContext.addSingleProduct({
      id: selectedProduct._id,
      price: discountPrice,
      title: selectedProduct.title,
      image: selectedProduct.images[0].image,
      quantity: quantity,
    });
    history.push({
      pathname: '/checkout',
      state: { fromBuy: true },
    });
  };

  return (
    <div className='productDetails'>
      <Container className='productDetails__container'>
        <Row className='productDetails__toprow'>
          <Col md='4' className='productDetails__toprow__imagebox'>
            <img
              src={
                selectedProduct &&
                selectedProduct.images[colorFamilyImageIndex].image
              }
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
                {selectedProduct && selectedProduct.reviews.length > 0
                  ? Array(Math.round(selectedProduct.rating))
                    .fill()
                    .map((_, i) => (
                      <StarIcon style={{ color: '#fdb900' }}></StarIcon>
                    ))
                  : Array(5)
                    .fill()
                    .map((_, i) => (
                      <StarIcon style={{ color: 'lightgray' }}></StarIcon>
                    ))}
              </Row>
              <Row className='productDetails__toprow__titlebox_pricerow'>
                <Col sm={3} md={4} lg={3} className='p-0'>
                  <strong className='productDetails__toprow__titlebox_originalprice'>
                    {/* ৳{selectedProduct && selectedProduct.price} */}
                    <CurrencyFormat
                      decimalScale={2}
                      thousandSeparator={true}
                      value={selectedProduct ? selectedProduct.price : 0}
                      displayType={'text'}
                      prefix='৳'
                    />
                  </strong>
                  <strong className='productDetails__toprow__titlebox__discount'>
                    -{selectedProduct && selectedProduct.discount}%
									</strong>
                </Col>
                <Col xs={4} sm={2} md={3} lg={3} className='p-0'>
                  <strong className='productDetails__toprow__titlebox_discountprice'>
                    {/* ৳
										{selectedProduct &&
                      selectedProduct.price -
                      selectedProduct.price * selectedProduct.discount * 0.01} */}
                    <CurrencyFormat
                      decimalScale={2}
                      thousandSeparator={true}
                      value={
                        selectedProduct
                          ? selectedProduct.price -
                          selectedProduct.price *
                          selectedProduct.discount *
                          0.01
                          : 0
                      }
                      displayType={'text'}
                      prefix='৳'
                    />
                  </strong>
                </Col>
                <Col xs={8} sm={5} className='p-0'>
                  <FavoriteIcon
                    style={{ alignSelf: 'center' }}
                    color='secondary'
                  ></FavoriteIcon>
                  <Button
                    onClick={handleWishList}
                    size='sm'
                    className='productDetails__toprow__titlebox__buttonwish'
                  >
                    ADD TO WISHLIST
									</Button>
                </Col>
              </Row>

              {/* color family */}
              <Row>
                <span className='productDetails__toprow__titlebox__heading'>
                  Color Family:{' '}
                </span>
                <span
                  className='productDetails__less__font'
                  style={{ textTransform: "uppercase" }}
                >
                  {selectedProduct &&
                    selectedProduct.images[colorFamilyImageIndex].color}
                </span>
              </Row>
              <Row style={{ marginLeft: 40 }}>
                {selectedProduct &&
                  selectedProduct.images.map((image) => (
                    <img
                      src={image.image}
                      alt={image.color}
                      onClick={() => handleColorFamilyChange(image)}
                      className='productDetails__toprow__titlebox__colorFamilyImg'
                    ></img>
                  ))}
              </Row>

              <Row className='productDetails__toprow__titlebox__quantityrow'>
                <span className='productDetails__toprow__titlebox__heading'>
                  Quantity:{' '}
                </span>
                <InputGroup className='productDetails__quantity__group'>
                  <Button
                    className='productDetails__quantity__button'
                    onClick={() => quantity - 1 && setQuantity(quantity - 1)}
                  >
                    -
									</Button>
                  <Input
                    onChange={(e) =>
                      setQuantity(getValue(e.target.value.replace(/\D/, '')))
                    }
                    className='productDetails__quantity__value'
                    value={quantity}
                  />
                  <Button
                    className='productDetails__quantity__button'
                    onClick={() =>
                      setQuantity(quantity == maxq ? quantity : quantity + 1)
                    }
                  >
                    +
									</Button>
                </InputGroup>
              </Row>

              <Row className='productDetails__toprow__titlebox__buyrow'>
                <Button
                  onClick={handleCart}
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
                  <span className='productDetails__toprow__titlebox__heading'>
                    SKU:{' '}
                  </span>
                  <span className='productDetails__less__font'>
                    {selectedProduct && selectedProduct.sku}
                  </span>
                </text>
              </Row>
              <Row>
                <text className='productDetails__toprow__titlebox__category'>
                  <span className='productDetails__toprow__titlebox__heading'>
                    Category:{' '}
                  </span>
                  <span className='productDetails__less__font'>
                    {selectedProduct && selectedProduct.categories.map(category => (
                      <Link to={'/' + category}>
                        <span style={{ marginRight: 10 }}>{category}</span>
                      </Link>
                    ))}
                  </span>
                </text>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row className='productDetails__bottomRows'>
          <Col>
            <Container className='productDetails__bottomRows__container'>
              <h6>Product features:</h6>
              <ul className='productDetails__less__font'>
                {selectedProduct &&
                  selectedProduct.features.map((feature) => {
                    return <li>{feature}</li>;
                  })}
              </ul>
              <hr></hr>
              <h6>Product specifications:</h6>
              <ul className='productDetails__less__font'>
                {selectedProduct &&
                  selectedProduct.specifications &&
                  selectedProduct.specifications.map((spec) => {
                    return <li>{spec}</li>;
                  })}
              </ul>
            </Container>
          </Col>
        </Row>

        {/* Question & Answer */}
        <Row className='productDetails__bottomRows'>

          <Col>
            <Container className='productDetails__bottomRows__container'>
              <Row className='productDetails__QA__container__header'>
                <Col md={6}>
                  <h5>
                    Questions about this product (
										{selectedProduct && selectedProduct.questionAns})
									</h5>
                </Col>
                <Col md></Col>
                {cartContext.isAuthenticated ? (
                  <Button
                    onClick={() => {
                      setAskQuestionButtonState(!askQuestionButtonState);
                    }}
                    style={{
                      backgroundColor: '#FF7F50',
                      border: 0,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  >
                    {!askQuestionButtonState ? (
                      <span>Ask Question</span>
                    ) : (
                        <ClearIcon></ClearIcon>
                      )}
                  </Button>
                ) : (
                    <span>
                      <span
                        className='stretched-link'
                        onClick={() => {
                          history.push({
                            pathname: '/login',
                            state: {
                              fromProduct: true,
                              productLocation: location.pathname,
                            },
                          });
                        }}
                      >
                        Login
										</span>{' '}
										to ask a question
                    </span>
                  )}
              </Row>

              {askQuestionButtonState && (
                <LocalForm
                  model='question'
                  onSubmit={(values) => handleAskQuestion(values)}
                >
                  <hr></hr>
                  <Row className='form-group'>
                    <Col md={10}>
                      <Control.text
                        className='form-control'
                        model='.question'
                        id='question'
                        name='question'
                        placeholder='Type the question'
                        validators={{
                          required,
                        }}
                      />
                      <Errors
                        className='text-danger'
                        model='.question'
                        show='touched'
                        messages={{
                          required: 'Required',
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Button
                        type='submit'
                        style={{
                          backgroundColor: '#FF7F50',
                          border: 0,
                        }}
                      >
                        Submit Question
											</Button>
                    </Col>
                  </Row>
                </LocalForm>
              )}
              <hr></hr>
              {selectedProduct && selectedProduct.questionAns ? (
                selectedProduct.questionAns.map((qa) => {
                  return (
                    <Container>
                      <Row style={{ marginBottom: 10 }}>
                        <Col xs='2' md='1'>
                          <h6>Q: </h6>
                        </Col>
                        <Col>
                          <Row style={{ fontWeight: 400, fontSize: 14 }}>
                            {qa.q}
                          </Row>
                          <Row>
                            <Row>
                              <Col style={{ fontSize: 12, fontWeight: 300 }}>
                                {qa.user + ' - '}
                              </Col>
                            </Row>
                            <Row>
                              <Col style={{ fontSize: 12, fontWeight: 300 }}>
                                {new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: '2-digit',
                                }).format(new Date(Date.parse(qa.qtime)))}{' '}
                              </Col>
                            </Row>
                          </Row>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs='2' md='1'>
                          <h6>A: </h6>
                        </Col>
                        <Col>
                          <Row style={{ fontWeight: 400, fontSize: 14 }}>
                            {qa.a}
                          </Row>
                          <Row style={{ fontSize: 12, fontWeight: 300 }}>
                            {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: '2-digit',
                            }).format(new Date(Date.parse(qa.qtime)))}{' '}
                          </Row>
                        </Col>
                      </Row>
                      <hr></hr>
                    </Container>
                  );
                })
              ) : (
                  <Row
                    style={{
                      justifyContent: 'center',
                      fontSize: 'medium',
                      fontWeight: 300,
                    }}
                  >
                    <span>No Question About The Product</span>
                  </Row>
                )}
            </Container>
          </Col>
        </Row>

        {/* Ratings & Reviews */}
        <Row className='productDetails__bottomRows'>
          <Col>
            <Container className='productDetails__bottomRows__container'>
              <h5>Reviews & Ratings</h5>
              <hr></hr>
              {selectedProduct && (
                <ProductDetailsReviewsAndRatings
                  selectedProduct={selectedProduct}
                />
              )}
            </Container>
          </Col>
        </Row>

        {/* Featured Images */}
        <Row className='productDetails__bottomRows'>
          <Col>
            <Container className='productDetails__bottomRows__container'>
              <h5>Featured Images</h5>
              <hr></hr>
              {selectedProduct && (
                <ProductDetailsFeaturedImages
                  selectedProduct={selectedProduct}
                />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetails;
