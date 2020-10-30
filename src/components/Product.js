import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
  CardTitle,
} from 'reactstrap';
import '../assets/css/Product.css';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';


function Product({ id, image, title, price, discountPrice, rating, number, slug }) {
  return (
    <div
      className='product shadow rounded'
    >
      <Link to={`/product/${slug}`} style={{ textDecoration: "inherit", color: 'inherit' }}>
        <Card className='product__card'>
          <CardImg
            top
            width='100%'
            src={image}
            className='product__card__image'
          />
          <CardBody className='product__card__body'>
            <CardTitle className='product__card__title'>{title}</CardTitle>
            <Row className=''>
              <Col
                sm={{ size: 6 }}
                className='product__card__original__price'
              >
                <strong>৳{price}</strong>
              </Col>
              <Col sm={{ size: 6 }} className='product__card__price'>
                <strong>৳{discountPrice}</strong>
              </Col>
              <Col className='product__card__rating'>
                {rating? 
                  <Rating defaultValue={rating} size='small' readOnly precision={0.5} />
                  : ('')
                }
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}

export default Product;
