import React, {useEffect, useState} from 'react';
import {
	Row,
	Col,
	Button,
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import '../assets/css/OrderProduct.css';
import CurrencyFormat from 'react-currency-format';

import ClearIcon from '@material-ui/icons/Clear';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;

function OrderProduct({ id, image, title, price, q, slug, reviewPosted, postReview, orderId, clearReviewPosted, discount }) {
  const [reviewButtonState, setReviewButtonState] = useState(false);

	const handleReview = (review) => {
		postReview({
			rating: review.rating,
			description: review.message,
			orderId: orderId
		}, id)
		setReviewButtonState(!reviewButtonState);
	};

	useEffect(()=> {
		if(reviewPosted){
			clearReviewPosted();
		}
	}, [])

  return (
		<React.Fragment>
			<tr className='orderproduct'>
				<td className='orderproduct__thumbnail'>
					<img src={image} alt='product image' className='' />
				</td>
				<td className='orderproduct__title'>{title}</td>
				<td className='orderproduct__price'>
					<CurrencyFormat
						value={price - price * discount * 0.01}
						decimalScale={2}
						displayType='text'
						thousandSeparator={true}
						prefix='৳'
					/>
				</td>
				<td className='orderproduct__quantity'>
					<span>{q}</span>
				</td>
				<td className='orderproduct__reviewButton'>
					<Button
						onClick={() => {
							setReviewButtonState(!reviewButtonState);
						}}
						style={{
							backgroundColor: '#FF7F50',
							border: 0,
							fontSize: '12px',
							minWidth: '90px',
						}}
					>
						{!reviewButtonState ? (
							<span>Give Review</span>
						) : (
							<ClearIcon></ClearIcon>
						)}
					</Button>
				</td>
			</tr>
			<tr>
				<td colSpan='5'>
					{reviewButtonState && (
						<LocalForm model='review' onSubmit={(values) => handleReview(values)}>
							<Row className='form-group'>
								<Col md={10}>
									<Control.textarea
										className='form-control'
										model='.message'
										id='message'
										name='message'
										placeholder='Type the review message'
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
										style={{ backgroundColor: 'white', height: 30 }}
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
										Submit Review
									</Button>
								</Col>
							</Row>
						</LocalForm>
					)}
				</td>
			</tr>
		</React.Fragment>
	);
}

export default OrderProduct;
