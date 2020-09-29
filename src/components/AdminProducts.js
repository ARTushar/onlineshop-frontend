import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	ButtonToggle
} from 'reactstrap';
import '../assets/css/AdminProducts.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import {PRODUCTS_DETAILS} from '../shared/productDetails';

import MenuIcon from '@material-ui/icons/Menu';

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
		<div className='admincustomers'>
			{/* <!-- Sidenav --> */}
			<Container className='admincustomers__container'>
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
						<Container className='admincustomers__table__container'>
							<Row className='admincustomers__table__container__row'>
								<h3>Products</h3>
							</Row>
							<hr></hr>
							<Row className='admincustomers__table__container__row'>
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
