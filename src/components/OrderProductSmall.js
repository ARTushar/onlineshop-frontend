import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import '../assets/css/OrderProductSmall.css';
import CurrencyFormat from 'react-currency-format';
import ClearIcon from '@material-ui/icons/Clear';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;

function OrderProductSmall({ id, image, title, price, q, maxq }) {
  const [rivewButtonState, setRivewButtonState] = useState(false);

	const handleRivew = (rivew) => {
		alert('adding rivew: ' + rivew.message + ' rating: ' + rivew.rating);
		setRivewButtonState(!rivewButtonState);
	};

  return (
		<>
			<Row className='orderproductsmall'>
				<Col xs='3' className='orderproductsmall__thumbnail'>
					<img src={image} alt='product image' className='' />
				</Col>
				<Col>
					<Row className='orderproductsmall__content'>
						<Col xs='12' className='orderproductsmall__title'>
							{title}
						</Col>
					</Row>
					<Row className='orderproductsmall__content'>
						<Col xs='6' className='orderproductsmall__heading'>
							PRICE
						</Col>
						<Col xs='6' className='orderproductsmall__price'>
							<CurrencyFormat
								value={price}
								decimalScale={2}
								displayType='text'
								prefix='৳'
								thousandSeparator={true}
							/>
						</Col>
					</Row>
					<Row className='orderproductsmall__content'>
						<Col xs='6' className='orderproductsmall__heading'>
							<span>QUANTITY</span>
						</Col>
						<Col xs='6' className='orderproductsmall__quantity'>
							<span>{q}</span>
						</Col>
					</Row>

					<Row className='orderproductsmall__content'>
						<Col xs='6' className='orderproductsmall__heading'>
							SUBTOTAL
						</Col>
						<Col className='orderproductsmall__subtotal'>
							<CurrencyFormat
								value={price * q}
								decimalScale={2}
								displayType='text'
								prefix='৳'
								thousandSeparator={true}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Button
					onClick={() => {
						setRivewButtonState(!rivewButtonState);
					}}
					style={{
						backgroundColor: '#FF7F50',
						border: 0,
						fontSize: '12px',
						minWidth: '90px',
					}}
				>
					{!rivewButtonState ? (
						<span>Give Rivew</span>
					) : (
						<ClearIcon></ClearIcon>
					)}
				</Button>
				{rivewButtonState && (
					<LocalForm model='rivew' onSubmit={(values) => handleRivew(values)}>
						<Row className='form-group'>
							<Col md={10}>
								<Control.textarea
									className='form-control'
									model='.message'
									id='message'
									name='message'
									placeholder='Type the rivew message'
									validators={{
										required,
										maxLength: maxLength(150),
									}}
								/>
								<Errors
									className='text-danger'
									model='.message'
									show='touched'
									messages={{
										required: 'Required',
										maxLength: 'Must be 150 characters or less',
									}}
								/>
							</Col>
							<Col md={2}>
								<label htmlFor='.rating'>Rating:</label>
								<Control.select
									style={{ backgroundColor: 'lightblue', height: 30 }}
									model='.rating'
									id='.rating'
									defaultValue='5'
								>
									<option value='5'>🌟🌟🌟🌟🌟</option>
									<option value='4'>🌟🌟🌟🌟</option>
									<option value='3'>🌟🌟🌟</option>
									<option value='2'>🌟🌟</option>
									<option value='1'>🌟</option>
								</Control.select>
							</Col>
							<Col md={2}>
								<Button
									type='submit'
									style={{
										backgroundColor: '#FF7F50',
										border: 0,
										fontSize: '12px',
									}}
								>
									Submit Rivew
								</Button>
							</Col>
						</Row>
					</LocalForm>
				)}
			</Row>

			<hr />
		</>
	);
}

export default OrderProductSmall;