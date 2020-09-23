import React from 'react';
import { Row, Col, Container, Jumbotron } from 'reactstrap';
import '../assets/css/Home.css';
import Product from './Product';
import Filter from './Filter'

function Home() {
    return (
        <div className="home">
            <Jumbotron className="home__jumbotron">
                <Container className="home__jumbotron__container">
                    <Row className="home__jumbotron__container__row">
                        <img src='nipun-banner.jpg' />
                    </Row>
                </Container>
            </Jumbotron>
            <Row className="home__main">
                <Col md={{size: 2}} className="home__main__filter">
                    <Filter />
                </Col>
                <Col className="">
                    <Row className="home__main__products">
                        <Product
                            id="4903850"
                            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                            price={199.99}
                            discountPrice={10}
                            rating={3}
                            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                        />
                        <Product
                            id="23445930"
                            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                            price={98.99}
                            discountPrice={15}
                            rating={5}
                            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                        />
                        <Product
                            id="3254354325"
                            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                            price={598.99}
                            discountPrice={15}
                            rating={4}
                            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                        />
                    </Row>
                </Col>

            </Row>
        </div>
    )
};

export default Home;
