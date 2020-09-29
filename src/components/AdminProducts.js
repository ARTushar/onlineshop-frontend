import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	ButtonToggle, 
	Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import '../assets/css/AdminProducts.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import {PRODUCTS_DETAILS} from '../shared/productDetails';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

function AdminProducts() {
	const productHeaders = [
		{
			Header: 'Products Table',
			columns: [
				{
					Header: 'PRODUCT ID',
					accessor: 'id',
				},
				{
					Header: 'PRODUCT NAME',
					accessor: 'title',
				},
				{
					Header: 'PRICE',
					accessor: 'price',
				},
				{
					Header: 'CATEGORY',
					accessor: 'category',
				},
				{
					Header: 'RATING',
					accessor: 'rating',
				},
				{
					Header: 'DISCOUNT',
					accessor: 'discount',
				},
				{
					Header: 'ACTIONS',
					accessor: 'actions',
				},
			],
		},
	];

	return (
		<div className='adminProducts'>
			{/* <!-- Sidenav --> */}
			<Container className='adminProducts__container'>
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
						<Container className='adminProducts__table__container'>
							<Row className='adminProducts__table__container__row'>
								<h3>Products</h3>
								<Col></Col>
								<Link to='/admin/addproduct'>
									<Button className='adminProducts__addProduct__button btn btn-success'>
										<AddIcon></AddIcon> Add New Product
									</Button>
								</Link>
							</Row>
							<hr></hr>
							<Row className='adminProducts__table__container__row'>
								<AdminDataTable
									columnHeaders={productHeaders}
									dataTable={PRODUCTS_DETAILS}
								/>
							</Row>
							<hr></hr>
						</Container>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AdminProducts;
