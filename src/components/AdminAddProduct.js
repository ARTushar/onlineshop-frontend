import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	ButtonToggle,
	Button,
	Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control, Errors, actions, Field } from 'react-redux-form';

import ReduxFormSelect from './ReduxFormSelect';
import '../assets/css/AdminAddProduct.css';
import '../assets/css/Admin.css';
import AdminSidebar from './AdminSidebar';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import ImageIcon from '@material-ui/icons/Image';
import AddIcon from '@material-ui/icons/Add';
import { Input } from '@material-ui/core';

const required = (val) => val && val.length;
const requiredObject = (val) => val.value && val.value.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

function AdminAddProduct() {
	const [imagePreviews, setImagePreviews] = useState([]);
	const dispatch = useDispatch();
	const product = useSelector(state => state.product);

	const categories = [
		{ value: 'bags', label: 'Bag' },
		{
			value: 'cloths',
			label: 'Cloths',
		},
	];

	const handleImage = (e) => {
		e.preventDefault();
		[...e.target.files].map((file) => {
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = () => {
				setImagePreviews([...imagePreviews, reader.result]);
			};
		})
		
	};

	const handleSubmit = (values) => {
		alert('image list size: ' + values.image.length + JSON.stringify(values));
	};

	return (
		<div className='admin'>
			<ButtonToggle id='sidebartoggler' className='admin__toggler'>
				<MenuIcon></MenuIcon>
			</ButtonToggle>
			{/* <!-- Sidenav --> */}
			<Container className='admin__container'>
				<Row>
					<Col md='2'>
						<UncontrolledCollapse
							navbar
							toggler='#sidebartoggler'
							defaultOpen={true}
						>
							<AdminSidebar></AdminSidebar>
						</UncontrolledCollapse>
					</Col>

					<Col md='10'>
						<Container className='adminAddProduct__form__container'>
							<Row className='adminAddProduct__form__container__row__header'>
								<h4>ADD NEW PRODUCT</h4>
								<Link to='/admin/products'>
									<Button className='adminAddProduct__cancelButton btn btn-danger'>
										<ClearIcon></ClearIcon>
									</Button>
								</Link>
							</Row>
							<hr></hr>
							<Row className='adminAddProduct__form__container__row'>
								<Container>
									<Form
										model='product'
										onSubmit={(values) => handleSubmit(values)}
									>
										<Row className='form-group'>
											<Label htmlFor='image' md={3}>
												<ImageIcon></ImageIcon> Image
											</Label>
											<br />
											<Col md={5}>
												<Control.file
													onChange={handleImage}
													multiple={true}
													model='.image'
													id='image'
													name='image'
													placeholder='Image'
													validators={{
														required,
													}}
												/>
												<Errors
													className='text-danger'
													model='.image'
													show='touched'
													messages={{
														required: 'Required',
													}}
												/>
												{product.image.length ? (
													product.image.map((image) => {
														let reader = new FileReader();
														reader.readAsDataURL(image);
														return (
															<img
																src={reader.result}
																alt='imagePreview'
																style={{ width: 100, height: 100 }}
															/>
														);
													})
												) : (
													<div></div>
												)}
											</Col>
										</Row>
										<Row className='form-group'>
											<Label htmlFor='sku' md={3}>
												SKU
											</Label>
											<Col md={9}>
												<Control.text
													model='.sku'
													id='sku'
													name='sku'
													placeholder='sku'
													className='form-control'
													// style={{
													// 	fontSize: 'small',
													// }}
													validators={{
														required,
														minLength: minLength(3),
														maxLength: maxLength(30),
													}}
												/>
												<Errors
													className='text-danger'
													model='.sku'
													show='touched'
													messages={{
														required: 'Required',
														minLength: 'Must be greater than 2 characters',
														maxLength: 'Must be 15 characters or less',
													}}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='title' md={3}>
												Title
											</Label>
											<Col md={9}>
												<Control.text
													model='.title'
													id='title'
													name='title'
													placeholder='Title for the product'
													className='form-control'
													// style={{
													// 	fontSize: 'small',
													// }}
													validators={{
														required,
														minLength,
													}}
												/>
												<Errors
													className='text-danger'
													model='.title'
													show='touched'
													messages={{
														required: 'Required',
													}}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='price' md={3}>
												Price
											</Label>
											<Col md={9}>
												<Control.text
													model='.price'
													id='price'
													name='price'
													placeholder='Price'
													className='form-control'
													// style={{
													// 	fontSize: 'small',
													// }}
													validators={{
														required,
													}}
												/>
												<Errors
													className='text-danger'
													model='.price'
													show='touched'
													messages={{
														required: 'Required',
													}}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='discount' md={3}>
												Discount
											</Label>
											<Col md={9}>
												<Control.text
													model='.discount'
													id='discount'
													name='discount'
													placeholder='Discount'
													className='form-control'
													// style={{
													// 	fontSize: 'small',
													// }}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='quantity' md={3}>
												Quantity
											</Label>
											<Col md={9}>
												<Control.text
													model='.quantity'
													id='quantity'
													name='quantity'
													placeholder='Quantity'
													className='form-control'
													// style={{
													// 	fontSize: 'small',
													// }}
													validators={{
														required,
													}}
												/>
												<Errors
													className='text-danger'
													model='.quantity'
													show='touched'
													messages={{
														required: 'Required',
													}}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='category' md={3}>
												Category
											</Label>
											<Col md={9}>
												<Control.select
													model='.category'
													id='category'
													name='category'
													className='form-control'
													validators={
														{
															// requiredObject
														}
													}
													placeholder='Add Category...'
													component={ReduxFormSelect}
													options={categories}
												/>

												<Errors
													className='text-danger'
													model='.category'
													show='touched'
													messages={
														{
															// requiredObject: 'Required',
														}
													}
												/>
											</Col>
										</Row>

										<Row className='form-group'>
											<Label htmlFor='subcategory' md={3}>
												Sub-category
											</Label>
											<Col md={9}>
												<Control.text
													model='.subcategory'
													id='subcategory'
													name='subcategory'
													className='form-control'
													placeholder='Subcategory'
													// style={{
													// 	fontSize: 'small',
													// }}
													validators={
														{
															// required
														}
													}
												/>

												<Errors
													className='text-danger'
													model='.subcategory'
													show='touched'
													messages={
														{
															// required: 'Required',
														}
													}
												/>
											</Col>
										</Row>

										<Row>
											<Col className='adminAddProduct__form__button'>
												<Button
													className='adminAddProduct__form__button__addFeatures'
													onClick={() =>
														dispatch(actions.push('product.features', ''))
													}
												>
													<AddIcon></AddIcon> Add Feature
												</Button>
											</Col>
											<Col xs={12}>
												{product.features.map((feature, j) => (
													<div className='row' style={{ marginTop: 10 }}>
														<Label htmlFor={`feature${j}`} md={3}>
															Feature #{j + 1} :{' '}
														</Label>
														<Col md={8}>
															<Control.text
																model={`.features[${j}]`}
																key={j}
																id={`.features${j}`}
																name={`.features${j}`}
																className='form-control'
																placeholder={`Feature ${j}`}
																style={{
																	fontSize: 'small',
																}}
															/>
														</Col>
														<Button
															title='Remove Feature'
															md={1}
															onClick={() =>
																dispatch(actions.remove('product.features', j))
															}
														>
															{' '}
															<ClearIcon />
														</Button>
													</div>
												))}
											</Col>
										</Row>

										<Row>
											<Col className='adminAddProduct__form__button'>
												<Button
													className='adminAddProduct__form__button__addFeatures'
													onClick={() =>
														dispatch(actions.push('product.specifications', ''))
													}
												>
													<AddIcon></AddIcon> Add Specifications
												</Button>
											</Col>
											<Col xs={12}>
												{product.specifications.map((spec, j) => (
													<div className='row' style={{ marginTop: 10 }}>
														<Label htmlFor={`spec${j}`} md={3}>
															Specification #{j + 1} :{' '}
														</Label>
														<Col md={8}>
															<Control.text
																model={`.specifications[${j}]`}
																key={j}
																id={`.spec${j}`}
																name={`.spec${j}`}
																className='form-control'
																placeholder={`Specification ${j}`}
																// style={{
																// 	fontSize: 'small',
																// }}
															/>
														</Col>
														<Button
															title='Remove Spec'
															md={1}
															onClick={() =>
																dispatch(
																	actions.remove('product.specifications', j)
																)
															}
														>
															{' '}
															<ClearIcon />
														</Button>
													</div>
												))}
											</Col>
										</Row>

										<hr />
										<Row className='row'>
											<Col xs='12' className='adminAddProduct__form__button'>
												<Button
													type='submit'
													className='adminAddProduct__form__button__submit'
												>
													Save The Product
												</Button>
											</Col>
										</Row>
									</Form>
								</Container>
							</Row>
							<hr></hr>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AdminAddProduct;
