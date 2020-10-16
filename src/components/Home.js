import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Container,
  Jumbotron,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import '../assets/css/Home.css';
import Product from './Product';

function Home({ fetchHomeProducts, homeProducts }) {



  useEffect(() => {
    if (homeProducts.length === 0) {
      console.log("home use effect");
      fetchHomeProducts();
    }
  }, [])

  return (
    <div className='home'>

      <Jumbotron className="home__jumbotron">
        <Container className="home__jumbotron__container">
          <Row className="home__jumbotron__container__row">
            <img src='/images/banner3.jpg' />
          </Row>
        </Container>
      </Jumbotron>
      <Container className='home__container'>
        {/* <Row className='home__main'> */}
          <Row className='home__main__products'>
            {Object.entries(homeProducts).map(
              (cateogryProduct) => {
                return (
                  <React.Fragment key={cateogryProduct}>
                    <Col xs={12} className="home__main__category">
                      <span className="home__main__category__heading">{cateogryProduct[0]}</span>
                      <hr className="home__main__underline" />
                    </Col>
                    {cateogryProduct[1].map(
                      (product) => {
                        return (
                          <Col
                            key={product._id}
                            xs={{ size: 5 }}
                            md={{ size: 4 }}
                            xl={{ size: 3 }}
                            className='home__main__product'
                          >
                            <Product
                              id={product._id}
                              title={product.title}
                              price={product.price / 100}
                              discountPrice={
                                (product.price -
                                product.price * product.discount * 0.01) / 100
                              }
                              rating={product.rating}
                              image={product.image}
                              slug={product.slug}
                            />
                          </Col>
                        )
                      }
                    )}
                  </React.Fragment>
                );
              }
            )}
          </Row>
        {/* </Row> */}
      </Container >
    </div >
  );
}

export default Home;
