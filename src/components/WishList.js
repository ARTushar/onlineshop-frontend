import { Button } from '@material-ui/core';
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import '../assets/css/WishList.css';
import { Link } from 'react-router-dom';
import Product from './Product';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import { UserContext } from '../utils/context';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

function WishList() {
  const userContext = React.useContext(UserContext);

  return (
    <div className='wishList'>

      <Container className='wishList__container'>
        <Row className='wishList__main'>
          <Col className=''>
            {userContext.wishlistProducts.length !== 0 ? (
            <Row className='wishList__main__products'>
              {userContext.wishlistProducts.map((product) => {
                return (
                  // <Col className="wishList__col">
                  <Col
                    xs={{ size: 5 }}
                    md={{ size: 4 }}
                    xl={{ size: 3 }}
                    className='wishList__product'
                  >
                    <Row className="wishList__remove">
                      <a role="button" onClick={()=> userContext.removeFromWishlist(product.id)} className="wishList__remove__button">
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
                      image={product.images[0].image}
                      slug={product.slug}
                    />
                  </Col>

                );
              })}

            </Row>
            ) : (
                <>
                  <div className="wishlist__no__product">
                    <RemoveShoppingCartIcon style={{ textAlign: "center", fontSize: "100px" }} />
                  </div>
                  <Row className="wishlist__no__product__message">
                    <span>NO PRODUCTS IN THE WISHLIST 😒</span>
                  </Row>
                  <Row className="justify-content-center">
                    <Link to="/" style={{textDecoration: "inherit", color: "inherit"}}>
                      <Button role="a" className="wishlist__no__product__button">
                        RETURN TO SHOP
                                </Button>
                    </Link>
                  </Row>
                </>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WishList;
