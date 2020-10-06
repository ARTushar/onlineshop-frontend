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
import { Link } from 'react-router-dom';

import '../assets/css/Admin.css';
import AdminSidebar from './AdminSidebar';
import AdminDataTable from './AdminDataTable';
import { CUSTOMERS } from '../shared/users';

import MenuIcon from '@material-ui/icons/Menu';
import PrintIcon from '@material-ui/icons/Print';

function AdminCustomers() {
	const columnHeaders = [
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
							<Row className='admin__table__container__row__customersHeader'>
								<h4>CUSTOMERS</h4>
								<Link to='/admin/addproduct'>
									<Button className='admin__printButton'>
										<PrintIcon></PrintIcon>
									</Button>
								</Link>
							</Row>
							<Row className='admin__table__container__row'>
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
