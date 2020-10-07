import React, { useState } from 'react';
import {
	Container,
	Row,
	Col,
	ButtonGroup,
	Button,
	InputGroup,
	Input,
	Progress,
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

import ProductDetailsReviewsAndRatings from './ProductDetailsReviewsAndRatings';

import { CartContext } from '../Context/context';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';

import '../assets/css/ProductDetails.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import StarIcon from '@material-ui/icons/Star';

const required = (val) => val && val.length;

function ProductDetails({ selectedProduct, addToWishlist }) {
	const maxq = 12;
	const [quantity, setQuantity] = React.useState(1);
	const cartContext = React.useContext(CartContext);
	const history = useHistory();

	const [askQuestionButtonState, setAskQuestionButtonState] = useState(false);

	const handleAskQuestion = (newQuestion) => {
		alert('adding question: ' + newQuestion);
		setAskQuestionButtonState(!askQuestionButtonState);
	};

	const getValue = (val) => (val <= 1 ? 1 : val >= maxq ? maxq : val);

	const discountPrice =
		selectedProduct?.price -
		selectedProduct?.price * selectedProduct?.discount * 0.01;

	const handleBuy = () => {
		cartContext.addSingleProduct({
			id: selectedProduct.id,
			price: discountPrice,
			title: selectedProduct.title,
			image: selectedProduct.image,
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
								{Array(selectedProduct && Math.ceil(selectedProduct.rating))
									.fill()
									.map((_, i) => (
										// <p>🌟</p>
										<StarIcon style={{ color: '#fdb900' }}></StarIcon>
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
										onClick={() =>
											addToWishlist({
												id: selectedProduct.id,
												price: selectedProduct.price,
												title: selectedProduct.title,
												image: selectedProduct.image,
												slug: selectedProduct.slug,
												discount: selectedProduct.discount,
												rating: selectedProduct.rating,
											})
										}
										size='sm'
										className='productDetails__toprow__titlebox__buttonwish'
									>
										ADD TO WISHLIST
									</Button>
								</Col>
							</Row>
							<Row className='productDetails__toprow__titlebox__quantityrow'>
								<span>Quantity: </span>
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
									onClick={() =>
										cartContext.addToCart({
											id: selectedProduct.id,
											price: discountPrice,
											title: selectedProduct.title,
											image: selectedProduct.image,
											quantity: quantity,
										})
									}
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
									<span>SKU: </span>
									<span className='productDetails__less__font'>
										{selectedProduct && selectedProduct.sku}
									</span>
								</text>
							</Row>
							<Row>
								<text className='productDetails__toprow__titlebox__category'>
									<span>Category: </span>
									<span className='productDetails__less__font'>
										{selectedProduct && selectedProduct.category}
									</span>
								</text>
							</Row>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__bottomRows'>
					<Col>
						<Container className='productDetails__bottomRows__container'>
							<h5>{selectedProduct && selectedProduct.description.header}</h5>
							<hr></hr>
							<h6>Product features:</h6>
							<ul className='productDetails__less__font'>
								{selectedProduct &&
									selectedProduct.description.features.map((feature) => {
										return <li>{feature}</li>;
									})}
							</ul>
							<hr></hr>
							<h6>Product specifications:</h6>
							<ul className='productDetails__less__font'>
								{selectedProduct &&
									selectedProduct.description.specifications.map((spec) => {
										return <li>{spec}</li>;
									})}
							</ul>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__bottomRows'>
					<Col>
						<Container className='productDetails__bottomRows__container'>
							<Row className='productDetails__QA__container__header'>
								<Col md={6}>
									<h5>
										Questions about this product (
										{selectedProduct && selectedProduct.questionAns.length})
									</h5>
								</Col>
								<Col md></Col>
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
												Ask Question
											</Button>
										</Col>
									</Row>
								</LocalForm>
							)}
							<hr></hr>
							{selectedProduct && selectedProduct.questionAns.length ? (
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

				<Row className='productDetails__bottomRows'>
					<Col>
						<Container className='productDetails__bottomRows__container'>
							<h5>Reviews & Ratings</h5>
							<hr></hr>
							{selectedProduct && selectedProduct.reviews.length ? (
								<ProductDetailsReviewsAndRatings
									selectedProduct={selectedProduct}
								/>
							) : (
								<Row
									style={{
										justifyContent: 'center',
										fontSize: 'medium',
										fontWeight: 300,
									}}
								>
									<span>No Reviews About The Product</span>
								</Row>
							)}
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default ProductDetails;
