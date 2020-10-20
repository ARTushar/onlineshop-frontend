import React, { useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import '../assets/css/Search.css';
import Product from './Product';
import Filter from './Filter';
import Sort from './Sort';
import FilterSidebar from './FilterSidebar';
import Loading from './Loading';
import FindInPageIcon from '@material-ui/icons/FindInPage';

function Search({productsLoading, productsError, searchProducts }) {
  useEffect(() => {
    console.log("changed")
  }, [searchProducts])

  if(productsLoading){
    return <Loading />
  }

  if (searchProducts.length == 0) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}>
        <FindInPageIcon style={{ textAlign: "center", fontSize: "100px" }} />
        <span style={{
          fontWeight: 700,
          // fontSize: "large"
        }}>There is no product that matches the search criteria <span role="img" aria-label="Not satisfied">😒</span></span>
      </div>
    );
  }

  return (
    <div className='search'>
      <Container className='search__container'>
        <Row className='search__main'>
          {/* <Col xs={1} className="search__main__filter"> */}
          {/* <FilterSidebar /> */}
          {/* </Col> */}
          <Col className=''>
            <Row className="justify-content-end">
              <FilterSidebar />
              <Sort />
            </Row>
            <Row className='search__main__products'>
              {searchProducts && searchProducts.map((product) => {

                return (
                  <Col
                    xs={{ size: 5 }}
                    md={{ size: 4 }}
                    xl={{ size: 3 }}
                    className='search__main__product'
                  >
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;
