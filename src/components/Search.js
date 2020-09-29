import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import '../assets/css/Search.css';
import { PRODUCTS } from '../shared/products';
import Product from './Product';
import Filter from './Filter';
import Sort from './Sort';

function Search() {
	return (
		<div className='search'>
            <Container className='search__container'>
                <Row className='search__main'>
                    {/* <Col md={{ size: 3 }} lg="2" className="search__main__filter"> */}
                        {/* <Filter /> */}
                    {/* </Col> */}
                    <Col className=''>
                        <Row className="justify-content-end">
                            <Filter />
                            <Sort />
                        </Row>
                        <Row className='search__main__products'>
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

export default Search;
