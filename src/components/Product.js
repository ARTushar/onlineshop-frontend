import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle,Row, Col, CardTitle } from 'reactstrap';
import '../assets/css/Product.css';
import Icon from '@material-ui/core/Icon';


function Product({ id, image, title, price, discountPrice, rating, number }) {
    return (
        <Col xs={{ size: 5 }} md={{ size: 4 }} xl={{size: 3}} className="product">
            <Card className="product__card">
                <CardImg top width="100%" src={image} className="product__card__image"/>
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <Row>
                        <Col sm={{size: 6}} className="product__original__price">
                        ৳{price}
                        </Col>
                        <Col sm={{size: 6}}>
                        ৳{discountPrice}
                        </Col>
                        </Row>
                </CardBody>
            </Card>
        </Col>
    );
}

export default Product;