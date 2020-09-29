import { Button } from '@material-ui/core';
import React from 'react';
import { Row, Col, Container, Jumbotron } from 'reactstrap';
import '../assets/css/WishList.css';
import { PRODUCTS } from '../shared/products';
import Product from './Product';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';


function WishList() {
  return (
    <div className='wishList'>

      <Container className='wishList__container'>
        <Row className='wishList__main'>
          <Col className=''>
            <Row className='wishList__main__products'>
              {PRODUCTS.map((product) => {
                return (
                  // <Col className="wishList__col">
                  <Col
                    xs={{ size: 5 }}
                    md={{ size: 4 }}
                    xl={{ size: 3 }}
                    className='wishList__product'
                  >
                    <Row className="wishList__remove">
                      <a role="button" className="wishList__remove__button">
                        <span>Remove</span>
                        <RemoveCircleSharpIcon style={{
                          color: "secondary",
                        }} />
                      </a>
                    </Row>
                    <Product
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      discountPrice={product.price - product.price * product.discount * .01}
                      rating={product.rating}
                      image={product.image}
                    />
                  </Col>

                );
              })}

            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WishList;
