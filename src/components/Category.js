import React from 'react';
import '../assets/css/Category.css';
import { CATEGORIES } from '../shared/categories';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {Row, Col} from 'reactstrap';

function Category() {
    return (
        <Row className="category">
            {
                CATEGORIES.map((category) => {
                    return (
                        <Col className='category__col'>
                            <Row className='category__col__icon'>
                                <LocalMallIcon fontSize='large' />
                            </Row>
                            <Row className='category__col__name'>
                                <span>{category.name}</span>
                            </Row>
                        </Col>
                    );
                })
            }
        </Row>
    )
}

export default Category;
