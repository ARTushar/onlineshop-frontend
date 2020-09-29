import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
	Button,
	ButtonGroup,
	ButtonToggle,
} from 'reactstrap';
import '../assets/css/AdminOrders.css';
import '../assets/css/AdminSidebar.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import { ORDERS } from '../shared/orders';

import MenuIcon from '@material-ui/icons/Menu';

function AdminOrders() {
	const columnHeaders = [
		{
			Header: 'Orders Table',
			columns: [
				{
					Header: 'ORDER#',
					accessor: 'serial_no',
				},
				{
					Header: 'CUSTOMER',
					accessor: 'user',
				},
				{
					Header: 'SHIP TO',
					accessor: 'shipping_address',
				},
				{
					Header: 'TOTAL AMOUNT',
					accessor: 'total_cost',
				},
				{
					Header: 'STATUS',
					accessor: 'status',
				},
				{
					Header: 'PAYMENT METHOD',
					accessor: 'payment_method',
				},
				{
					Header: 'PAYED AMOUNT',
					accessor: 'payed_amount',
				},
				{
					Header: 'ACTIONS',
					accessor: 'actions',
				},
			],
		},
	];

	return (
		<div className='adminorders'>
			{/* <!-- Sidenav --> */}
			<Container className='adminorders__container'>
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
						<Container className='adminorders__table__container'>
							<Row className='adminorders__table__container__row'>
								<h3>Orders</h3>
							</Row>
							<hr></hr>
							<Row className='adminorders__table__container__row'>
								<AdminDataTable
									columnHeaders={columnHeaders}
									dataTable={ORDERS}
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

export default AdminOrders;
