import React from 'react';
import { Container, Row, Col, Input, Button, InputGroup, InputGroupAddon, UncontrolledButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import '../assets/css/Filter.css';

function Filter() {
    const [minPrice, setMinPrice] = React.useState("");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [rating, setRating] = React.useState();

    const changeRating = (val) => {
        setRating(val);
    }

    React.useEffect(() => {
        console.log(`minPrice: ${minPrice} maxPrice: ${maxPrice} rating: ${rating}`);
    })

    return (
        <div className="filter">
            <Container className="filter__container">
                <Row className="filter__heading">
                    <span>Filter</span>
                </Row>
                <Row className="filter__price">
                    <Col xs={{ size: 12 }} className="filter__type__heading">
                        <span>Price</span>
                    </Col>
                    <InputGroup className="filter__price__limit">
                        <InputGroupAddon addonType="append" className="filter__input__group">
                            <Input placeholder="min" className="filter__price__limit" value={minPrice} onChange={e => setMinPrice(e.target.value.replace(/\D/, ''))} />
                            <Input placeholder="max" className="filter__price__limit" value={maxPrice} onChange={e => setMaxPrice(e.target.value.replace(/\D/, ''))} />
                            <Button type="submit" style={{backgroundColor: "HighlightText"}} className="filter__price__submit__button">
                                <PlayArrowIcon style={{}} />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Row>
                <Col xs={{ Size: 12 }} className="filter__type__heading">
                    <span>Rating</span>
                </Col>
                <Row>
                    <UncontrolledButtonDropdown size="sm" className="filter__rating">
                        <DropdownToggle caret style={{backgroundColor: "HighlightText", fontSize: "small" }} >
                           <span>Rating</span>
                        </DropdownToggle>
                        <DropdownMenu style={{fontSize: "small", width: "20px"}} className="filter__rating__dropdownmenu">
                            <DropdownItem onClick={()=> changeRating(1)}>1+</DropdownItem>
                            <DropdownItem onClick={()=> changeRating(2)}>2+</DropdownItem>
                            <DropdownItem onClick={()=> changeRating(3)}>3+</DropdownItem>
                            <DropdownItem onClick={()=> changeRating(4)}>4+</DropdownItem>
                            <DropdownItem onClick={()=> changeRating(5)}>5</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </Row>

            </Container>
        </div>
    )
}

export default Filter;
