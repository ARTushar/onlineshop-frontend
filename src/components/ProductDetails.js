import React, { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import '../assets/css/ProductDetails.css';
import FavoriteIcon from '@material-ui/icons/Favorite';

function ProductDetails({ selectedProduct }) {
	const [quantity, setQuantity] = useState(1);

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
								<Col sm={12} md={6} lg={4}>
									<strong className='productDetails__toprow__titlebox_originalprice'>
										৳{selectedProduct && selectedProduct.price}
									</strong>
									<strong className='productDetails__toprow__titlebox__discount'>
										-{selectedProduct && selectedProduct.discount}%
									</strong>
								</Col>
								<Col sm={12} md={6} lg={4}>
									<strong className='productDetails__toprow__titlebox_discountprice'>
										৳
										{selectedProduct &&
											selectedProduct.price -
												selectedProduct.price * selectedProduct.discount * 0.01}
									</strong>
								</Col>
							</Row>
							<Row className='productDetails__toprow__titlebox_quantityrow'>
								<span style={{ fontSize: 20, fontWeight: 400 }}>
									Quantity:{' '}
								</span>
								<ButtonGroup
									size='md'
									className='productDetails__toprow__titlebox_quantityrow__btngrp'
								>
									<Button
										onClick={() => {
											quantity - 1 && setQuantity(quantity - 1);
										}}
									>
										-
									</Button>
									<Button active={false}>{quantity}</Button>
									<Button
										onClick={() => {
											setQuantity(quantity + 1);
										}}
									>
										+
									</Button>
								</ButtonGroup>
							</Row>
							<Row className='productDetails__toprow__titlebox_wishrow'>
								<FavoriteIcon></FavoriteIcon>
								<Button
									color='warning'
									size='sm'
									className='productDetails__toprow__titlebox_buttonwish'
								>
									ADD TO WISHLIST
								</Button>
							</Row>
							<Row className='productDetails__toprow__titlebox_buyrow'>
								<Button
									color='danger'
									size='lg'
									className='productDetails__toprow__titlebox_buttoncart'
								>
									ADD TO CART
								</Button>
								<Button
									color='success'
									size='lg'
									className='productDetails__toprow__titlebox_buttonbuy'
								>
									BUY NOW
								</Button>
							</Row>
							<Row>
								<text className='productDetails__toprow__titlebox_category'>
									Category: {selectedProduct && selectedProduct.category}
								</text>
							</Row>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__description'>
					<Col>
						<Container className='productDetails__description__container'>
							<h4 style={{ marginTop: 10 }}>
								{selectedProduct && selectedProduct.description.header}
							</h4>
							<hr></hr>
							<h6>Product features:</h6>
							<ul>
								{selectedProduct &&
									selectedProduct.description.features.map((feature) => {
										return <li>{feature}</li>;
									})}
							</ul>
							<hr></hr>
							<h6>Product specifications:</h6>
							<ul>
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
							<h4 style={{ marginTop: 10 }}>Questions about this product</h4>
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
							<h4 style={{ marginTop: 10 }}>Reviews</h4>
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
