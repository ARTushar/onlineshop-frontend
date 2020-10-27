import React, { useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import '../assets/css/Search.css';
import Product from './Product';
import Sort from './Sort';
import FilterSidebar from './FilterSidebar';
import Loading from './Loading';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategoryName } from '../redux/actionCreators';

function Search({fetchCategoryProducts, categoryName, sortProducts, filterProducts, productsLoading, productsError, filteredProducts }) {
  const currentCategoryName = useSelector(state => state.products.currentCategoryName);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchCategoryProducts) {
      if (categoryName !== currentCategoryName) {
        fetchCategoryProducts(categoryName);
        dispatch(setCurrentCategoryName(categoryName));
      }
    }
  }, [])

  if (productsLoading) {
    return <Loading />
  }

  if (filteredProducts.length == 0) {
    return (
      <div>
        <FilterSidebar filterProducts={filterProducts} />
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px"
        }}>
          <FindInPageIcon style={{ textAlign: "center", fontSize: "100px" }} />
          <span style={{
            fontWeight: 700,
            // fontSize: "large"
          }}>There is no product that matches the criteria </span>
          <span role="img" aria-label="Not satisfied">😒</span>
        </div>
      </div>
    );
  }

  return (
    <div className='search'>
      <Container className='search__container'>

        {categoryName && (
          <Row className="justify-content-center">
            <span style={{
              fontWeight: 700,
              fontSize: "larger",
              textTransform: "capitalize",
            }}>{categoryName}</span>
          </Row>
        )}
        <Row className='search__main'>
          <Col className=''>
            <Row className="justify-content-between">
              <FilterSidebar filterProducts={filterProducts} />
              <Sort sortProducts={sortProducts} />
            </Row>
            <Row className='search__main__products'>
              {filteredProducts && filteredProducts.map((product) => {
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
                      rating={product.averageRating}
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
