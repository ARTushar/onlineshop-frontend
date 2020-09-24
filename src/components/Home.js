import React from 'react';
import { Row, Col, Container, Jumbotron } from 'reactstrap';
import '../assets/css/Home.css';
import { PRODUCTS } from '../shared/products';
import Product from './Product';
import Filter from './Filter';

function Home() {
	return (
		<div className='home'>
			<hr className='home__divider' />
			<Jumbotron className="home__jumbotron">
                <Container className="home__jumbotron__container">
                    <Row className="home__jumbotron__container__row">
                        <img src='nipun-banner.jpg' />
                    </Row>
                </Container>
            </Jumbotron>
			<Container className='home__container'>
				<Row className='home__main'>
					{/* <Col md={{size: 2}} className="home__main__filter">
                    <Filter />
                </Col> */}
					<Col className=''>
						<Row className='home__main__products'>
                            {PRODUCTS.map((product) => {
                                return (
                                    <Product
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        discountPrice={product.price - product.price * product.discount * .01}
                                        rating={product.rating}
                                        image={product.image}
                                    />
                                );
                            })}
							
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Home;
