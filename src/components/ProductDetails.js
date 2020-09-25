import React from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import '../assets/css/ProductDetails.css';
import FavoriteIcon from '@material-ui/icons/Favorite';

function ProductDetails() {
	return (
		<div className='productDetails'>
			<Container className='productDetails__container'>
				<Row className='productDetails__toprow'>
					<Col md='4' className='productDetails__toprow__imagebox'>
						<img
							src='images/products/handBag.jpg'
							className='productDetails__toprow__image'
							alt='product image'
						></img>
					</Col>
					<Col className='productDetails__toprow__titlebox'>
						<Container>
							<Row>
								<h4 className='productDetails__toprow__titlebox__title'>
									Lamaze Peek-A-Boo Forest, Fun Interactive Baby Book with
									Inspiring Rhymes and Stories
								</h4>
							</Row>
							<Row className='productDetails__toprow__titlebox_rating'>
								{Array(4)
									.fill()
									.map((_, i) => (
										<p>🌟</p>
									))}
							</Row>
							<Row className='productDetails__toprow__titlebox_pricerow'>
								<Col className='productDetails__toprow__titlebox_price'>
									<strong className='productDetails__toprow__titlebox_originalprice'>
										৳200
									</strong>
									<strong className='productDetails__toprow__titlebox_discountprice'>
										৳180
									</strong>
								</Col>
								<Col className='productDetails__toprow__titlebox_discountprice'></Col>
							</Row>
							<Row className='productDetails__toprow__titlebox_quantityrow'>
								<span>Quantity: </span>
								<ButtonGroup
									size='sm'
									className='productDetails__toprow__titlebox_quantityrow__btngrp'
								>
									<Button>-</Button>
									<Button>1</Button>
									<Button>+</Button>
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
									Category: Bags
								</text>
							</Row>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__description'>
					<Col>
						<Container className='productDetails__description__container'>
							<h4 style={{ marginTop: 10 }}>Description</h4>
							<hr></hr>
							<h6>Product features</h6>
							<text>
								Product Type: Backpack(without Doll) For Girl Gender: Women You
								Get this backpack Bag without Doll. Style: New style Fashion
								Closure type:Zipper Material: Nylon Lifting parts type: Handling
								handles + adjustable shoulder strap
							</text>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__QA'>
					<Col>
						<Container className='productDetails__QA__container'>
							<h4 style={{ marginTop: 10 }}>Questions about this product</h4>
							<hr></hr>
							<Row>
								<Col xs='2'>Q:</Col>
								<Col xs='8'>Eta ki large naki mini size?</Col>
							</Row>
							<Row>
								<Col xs='2'>A:</Col>
								<Col xs='8'>Sorry sir eta out of stock.</Col>
							</Row>
							<hr></hr>
							<Row>
								<Col xs='2'>Q:</Col>
								<Col xs='8'>Eta ki large naki mini size?</Col>
							</Row>
							<Row>
								<Col xs='2'>A:</Col>
								<Col xs='8'>Sorry sir eta out of stock.</Col>
							</Row>
							<hr></hr>
						</Container>
					</Col>
				</Row>

				<Row className='productDetails__review'>
					<Col>
						<Container className='productDetails__review__container'>
							<h4 style={{ marginTop: 10 }}>Reviews</h4>
							<hr></hr>
							<Row style={{ marginLeft: 5 }}>
								{Array(4)
									.fill()
									.map((_, i) => (
										<p>🌟</p>
									))}
							</Row>
							<Row>
								<Col>by Mysha Z.</Col>
							</Row>
							<Row>
								<Col>
									All was well. Thank you very much for getting the things I
									wanted.
								</Col>
							</Row>
							<hr></hr>
							<Row style={{ marginLeft: 5 }}>
								{Array(4)
									.fill()
									.map((_, i) => (
										<p>🌟</p>
									))}
							</Row>
							<Row>
								<Col>by Mysha Z.</Col>
							</Row>
							<Row>
								<Col>
									All was well. Thank you very much for getting the things I
									wanted.
								</Col>
							</Row>
							<hr></hr>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default ProductDetails;
