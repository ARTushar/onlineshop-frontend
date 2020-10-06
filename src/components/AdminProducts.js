import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	ButtonToggle,
	Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import '../assets/css/Admin.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import { PRODUCTS_DETAILS } from '../shared/productDetails';
import { exportTableToPDF } from '../shared/AdminFunctions';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';

function AdminProducts() {
	const productHeaders = [
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
	];

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
						<Container className='admin__table__container'>
							<Row className='admin__table__container__row__productsHeader'>
								<h4>PRODUCTS</h4>
								<Link to='/admin/addproduct'>
									<Button className='adminProducts__addProduct__button'>
										<AddIcon></AddIcon>
									</Button>
								</Link>
								<Button
									onClick={() => {
										exportTableToPDF(productHeaders, PRODUCTS_DETAILS);
									}}
									className='admin__printButton'
								>
									<PrintIcon></PrintIcon>
								</Button>
							</Row>
							<Row className='admin__table__container__row'>
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
