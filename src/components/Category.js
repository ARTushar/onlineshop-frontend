import React from 'react';
import '../assets/css/Category.css';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {Row, Col, Container} from 'reactstrap';

function Category() {
    return (
        <Row className="category">
            <Col className="category__col">
                <Row className="category__col__icon" >
                    <LocalMallIcon fontSize="large" />
                </Row>
                <Row className="category__col__name">
                    <span>Bag</span>
                </Row>
            </Col>
            <Col className="category__col">
                <Row className="category__col__icon" >
                    <LocalMallIcon fontSize="large" />
                </Row>
                <Row className="category__col__name">
                    <span>Cloth</span>
                </Row>
            </Col>
        </Row>
    )
}

export default Category;
