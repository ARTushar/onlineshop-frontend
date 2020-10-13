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
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const productsPerPage = 10;
  const pageCount = Math.ceil(homeProducts.length / productsPerPage);

  const [startProductIndex, endProductIndex] = [
    currentPageNumber * productsPerPage - productsPerPage,
    currentPageNumber * productsPerPage,
  ];

  const handlePageClick = (e, index) => {
    e.preventDefault();
    if (index < 1) return;
    if (index > pageCount) return;
    setCurrentPageNumber(index);
  }

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
        <Row className='home__main'>
          <Col className=''>
            <Row className='home__main__products'>
              {homeProducts.slice(startProductIndex, endProductIndex).map(
                (product) => {
                  return (
                    <Col
                      xs={{ size: 5 }}
                      md={{ size: 4 }}
                      xl={{ size: 3 }}
                      className='home__main__product'
                    >
                      <Product
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        discountPrice={
                          product.price -
                          product.price * product.discount * 0.01
                        }
                        rating={product.rating}
                        image={product.image}
                        slug={product.slug}
                      />
                    </Col>
                  );
                }
              )}
            </Row>
          </Col>
        </Row>
        <Row className='home__pagination'>
          <Pagination aria-label='Page navigation example'>
            <PaginationItem
              onClick={(e) => handlePageClick(e, 1)}
              disabled={currentPageNumber === 1}
            >
              <PaginationLink first href='#' />
            </PaginationItem>
            <PaginationItem
              onClick={(e) => handlePageClick(e, currentPageNumber - 1)}
              disabled={currentPageNumber === 1}
            >
              <PaginationLink previous href='#' />
            </PaginationItem>
            {Array(pageCount)
              .fill()
              .map((_, i) => (
                <PaginationItem
                  onClick={(e) => handlePageClick(e, i + 1)}
                  active={i + 1 == currentPageNumber}
                  id={i + 1}
                  key={i + 1}
                >
                  <PaginationLink href='#'>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem
              onClick={(e) => handlePageClick(e, currentPageNumber + 1)}
              disabled={currentPageNumber === pageCount}
            >
              <PaginationLink next href='#' />
            </PaginationItem>
            <PaginationItem
              onClick={(e) => handlePageClick(e, pageCount)}
              disabled={currentPageNumber === pageCount}
            >
              <PaginationLink last href='#' />
            </PaginationItem>
          </Pagination>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
