import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	ButtonToggle,
	Button,
	Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Control } from 'react-redux-form';

import '../assets/css/AdminAddProduct.css';
import AdminSidebar from './AdminSidebar';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import ImageIcon from '@material-ui/icons/Image';
import { Input } from '@material-ui/core';

function AdminAddProduct() {
	const handleImage = () => {
		alert('image added');
	};

	return (
		<div className='adminAddProduct'>
			{/* <!-- Sidenav --> */}
			<Container className='adminAddProduct__container'>
				<ButtonToggle id='sidebartoggler'>
					<MenuIcon></MenuIcon>
				</ButtonToggle>
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
							<Row className='adminAddProduct__form__container__row'>
								<h3>Add Product</h3>
								<Col></Col>
								<Link to='/admin/products'>
									<Button className='adminAddProduct__cancelButton btn btn-danger'>
										<ClearIcon></ClearIcon> Cancel
									</Button>
								</Link>
							</Row>
							<hr></hr>
							<Row className='adminAddProduct__form__container__row'>
								<Col>
									<Row className='photo'>
										<div className='image'>
											{/* {imagePreview ? (
											<img src={imagePreview} alt='imagePreview' />
										) : (
											<div></div>
										)} */}
										</div>
										<label htmlFor='photo'>
											Image <ImageIcon></ImageIcon>
										</label>
										<br />
										<input
											onChange={handleImage}
											id='photo'
											type='file'
											accept='image/x-png,image/gif,image/jpeg'
										/>
									</Row>

									<Row>
										<Form model='product' className='form' role='form'>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_code'>Product Code</Label>
												</Col>
												<Col>
													<Control.text
														model='.code'
														id='product_code'
														name='product_code'
														placeholder='Product Code'
													></Control.text>
												</Col>
											</Row>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_title'>Title</Label>
												</Col>
												<Col>
													<Control.text
														model='.title'
														id='product_title'
														name='product_title'
														placeholder='Product Title'
													></Control.text>
												</Col>
											</Row>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_price'>Price</Label>
												</Col>
												<Col>
													<Control.text
														model='.price'
														id='product_price'
														name='product_price'
														placeholder='Product price'
													></Control.text>
												</Col>
											</Row>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_discount'>Discount</Label>
												</Col>
												<Col>
													<Control.text
														model='.discount'
														id='product_discount'
														name='product_discount'
														placeholder='Product discount'
													></Control.text>
												</Col>
											</Row>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_quantity'>Quantity</Label>
												</Col>
												<Col>
													<Control.text
														model='.quantity'
														id='product_quantity'
														name='product_quantity'
														placeholder='Product quantity'
													></Control.text>
												</Col>
											</Row>
											<Row className='form-group'>
												<Col>
													<Label htmlFor='product_quantity'>Category</Label>
												</Col>
												<Col>
													<Control.text
														model='.quantity'
														id='product_quantity'
														name='product_quantity'
														placeholder='Product quantity'
													></Control.text>
												</Col>
											</Row>
										</Form>
									</Row>
								</Col>
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
