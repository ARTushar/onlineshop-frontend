import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
  NavbarToggler,
  Button,
	ButtonGroup,
	ButtonToggle
} from 'reactstrap';
import '../assets/css/AdminOrders.css';
import '../assets/css/AdminSidebar.css';
import AdminSidebar from './AdminSidebar';
import { ORDERS } from '../shared/orders';

import MenuIcon from '@material-ui/icons/Menu';

function AdminOrders() {
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
								<div className='table-responsive-md'>
									<table
										className='table table-striped table-bordered table-hover'
										style={{ minWidth: 800 }}
									>
										<thead className='thead-dark'>
											<tr>
												<th scope='col'>ORDER#</th>
												<th scope='col'>CUSTOMER</th>
												<th scope='col'>SHIP TO</th>
												<th scope='col'>TOTAL AMOUNT</th>
												<th scope='col'>STATUS</th>
												<th scope='col'>PAYMENT METHOD</th>
												<th scope='col'>PAYED AMOUNT</th>
												<th scope='col'>ACTIONS</th>
											</tr>
										</thead>
										<tbody>
											{ORDERS.map((order) => {
												return (
													<tr>
														<th scope='row'>{order.serial_no}</th>
														<td>{order.user}</td>
														<td>{order.shipping_address}</td>
														<td>{order.total_cost}</td>
														<td>{order.status}</td>
														<td>{order.payment_method}</td>
														<td>{order.payed_amount}</td>
														<td>
															<Button>view</Button>
															<Button>cancel</Button>
														</td>
													</tr>
												);
											})}
										</tbody>
										<caption>showing 3 of 20 entries</caption>
									</table>
								</div>
							</Row>
							<Row className='adminorders__table__container__row'>
								<ButtonGroup size='sm' className='adminorders__buttongrp'>
									<Button>previous</Button>
									<Button>1</Button>
									<Button>2</Button>
									<Button>...</Button>
									<Button>next</Button>
								</ButtonGroup>
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
