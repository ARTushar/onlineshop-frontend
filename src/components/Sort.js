import React from 'react';
import '../assets/css/Sort.css';
import { Col } from 'reactstrap';
import Select from 'react-select';

function Sort({sortProducts}) {
  const options = [
    { value: 'bestMatch', label: 'Best Match'},
    { value: 'priceLow', label: 'Price Low to High'},
    { value: 'priceHigh', label: 'Price High to Low'}
  ]

  const handleSort = (val) => {
    sortProducts(val.value);
  }

  return (
    <Col xs={6} sm={8}  className="sort p-0">
      <Select onChange={handleSort} isSearchable={false} defaultValue={options[0]} options={options} />
    </Col>
  )
}

export default Sort;
