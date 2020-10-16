import React from 'react';
import '../assets/css/Sort.css';
import { Col, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Sort() {
    const [sortType, setSortType] = React.useState('popularity');

    const changeSortType = (type) => setSortType(type);

    return (
        <Col className="sort">
            <UncontrolledButtonDropdown direction="down" size="sm" className="sort__rating">
                        <DropdownToggle caret >
                           <span className="sort__span">Sort by</span>
                        </DropdownToggle>
                        <DropdownMenu style={{fontSize: "small", width: "20px"}} className="sort__rating__dropdownmenu">
                            <DropdownItem onClick={()=> changeSortType('priceHigh')}>Price high to low</DropdownItem>
                            <DropdownItem onClick={()=> changeSortType('priceLow')}>Price low to high</DropdownItem>
                            <DropdownItem onClick={()=> changeSortType('popularity')}>Popularity</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
        </Col>
    )
}

export default Sort;
