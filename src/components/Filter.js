import React from 'react';
import { Container, Row, Col, Input, Button, InputGroup, InputGroupAddon, UncontrolledButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavbarToggler, UncontrolledCollapse, ButtonToggle } from 'reactstrap';
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
			<div className='filter'>
				<Container className='filter__container'>
					<ButtonToggle
						id='filtertoggler'
						style={{
							border: '0px',
							fontSize: 'small',
							outline: 'none',
							backgroundColor: 'HighlightText',
						}}
						className='filter__toggler'
					>
						<span>Filter</span>
					</ButtonToggle>
					<UncontrolledCollapse
						toggler='#filtertoggler'
						className='filter__collapse'
					>
						<Row>
							<Col xs='12' className='filter__type__heading'>
								<span>Price</span>
							</Col>
							<Col xs='12'>
								<InputGroup className='filter__price__limit'>
									<Row>
										<Col>
											<Input
												placeholder='min'
												className='filter__price__limit'
												value={minPrice}
												onChange={(e) =>
													setMinPrice(e.target.value.replace(/\D/, ''))
												}
											/>
										</Col>
									</Row>
									<Row>
										<Col>
											<Input
												placeholder='max'
												className='filter__price__limit'
												value={maxPrice}
												onChange={(e) =>
													setMaxPrice(e.target.value.replace(/\D/, ''))
												}
											/>
										</Col>
									</Row>
									<Row>
										<Col xs='12' className='filter__price__submit__button'>
											<Button
												className='btn btn-sm'
												type='submit'
												style={{ backgroundColor: 'HighlightText' }}
											>
												<PlayArrowIcon style={{}} />
											</Button>
										</Col>
									</Row>
								</InputGroup>
							</Col>
						</Row>

						<Row className='filter__rating'>
							<Col xs='12'>
								<span>Rating</span>
							</Col>
							<Col xs='12'>
								<UncontrolledButtonDropdown size='sm'>
									<DropdownToggle
										style={{
											backgroundColor: 'HighlightText',
											fontSize: 'small',
										}}
									>
										<span>Rating</span>
									</DropdownToggle>
									<DropdownMenu
										style={{ fontSize: 'small' }}
										className='filter__rating__dropdownmenu'
									>
										<DropdownItem onClick={() => changeRating(1)}>
											1+
										</DropdownItem>
										<DropdownItem onClick={() => changeRating(2)}>
											2+
										</DropdownItem>
										<DropdownItem onClick={() => changeRating(3)}>
											3+
										</DropdownItem>
										<DropdownItem onClick={() => changeRating(4)}>
											4+
										</DropdownItem>
										<DropdownItem onClick={() => changeRating(5)}>
											5
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</Col>
						</Row>
					</UncontrolledCollapse>
				</Container>
			</div>
		);
}

export default Filter;
