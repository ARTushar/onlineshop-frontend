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
import '../assets/css/AdminCustomers.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import { CUSTOMERS } from '../shared/users';

import MenuIcon from '@material-ui/icons/Menu';

function AdminCustomers() {
	const columnHeaders = [
		{
			Header: 'Customers Table',
			columns: [
				{
					Header: 'CUSTOMER',
					accessor: 'name',
				},
				{
					Header: 'EMAIL',
					accessor: 'email',
				},
				{
					Header: 'MOBILE',
					accessor: 'mobile',
				},
				{
					Header: 'ADDRESS',
					accessor: 'address',
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
								<h3>Customers</h3>
							</Row>
							<hr></hr>
							<Row className='admincustomers__table__container__row'>
								<AdminDataTable
									columnHeaders={columnHeaders}
									dataTable={CUSTOMERS}
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

export default AdminCustomers;
