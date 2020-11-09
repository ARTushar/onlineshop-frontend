import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Jumbotron,
} from 'reactstrap';
import '../assets/css/Home.css';
import HomeCarousel from './HomeCarousel';
import Loading from './Loading';
import Product from './Product';
import { useWindowSize } from './WindowSize';

const getBreakpointLimit = (width) => {
  if(width < 576) return 12;
  if(width < 768) return 12;
  if(width < 1100) return 12;
  if(width < 1320) return 10;
  return 12;
}

function Home({productsLoading, prouductsError, fetchHomeProducts, homeProducts }) {

  let [width, height] = useWindowSize();

  const limit = getBreakpointLimit(width);

  useEffect(() => {
      fetchHomeProducts(limit);
  }, [limit])

  return (
    <div className='home'>

      <Jumbotron className="home__jumbotron">
        <Container className="home__jumbotron__container">
          <Row className="home__jumbotron__container__row">
            {/* <img src='/images/banner7.jpg' /> */}
            <HomeCarousel className='home__carousel'/>
          </Row>
        </Container>
      </Jumbotron>
      {productsLoading ? (
        <Loading />
      ) : (
          <Container className='home__container'>
            {/* <Row className='home__main'> */}
            <Row className='home__main__products'>
              {Object.entries(homeProducts).map(
                (cateogryProduct) => {
                  return (
                    <React.Fragment key={cateogryProduct}>
                      <Col xs={12} className="home__main__category">
                        <hr />
                        <Link to={`/category/${cateogryProduct[0].split(' ').join('-')}`} style={{textDecoration: 'inherit'}}>
                        <span className="home__main__category__heading">{cateogryProduct[0]}</span>
                        </Link>
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
                                price={product.price}
                                discountPrice={
                                  product.price -
                                  product.price * product.discount * 0.01
                                }
                                rating={product.averageRating}
                                image={product.images[0].image}
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
        )}

    </div >
  );
}

export default Home;
