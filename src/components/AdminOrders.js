import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
  NavbarToggler,
  Button,
  ButtonGroup
} from 'reactstrap';
import '../assets/css/AdminOrders.css';
import '../assets/css/AdminSidebar.css';
import AdminSidebar from './AdminSidebar';

function AdminOrders() {
	return (
		<div className='adminorders'>
			{/* <!-- Sidenav --> */}
			<Container className='adminorders__container'>
				<NavbarToggler
					id='sidebartoggler'
					className='d-sm-block d-md-none'
					style={{
						border: '2px',
						color: 'primary',
						outline: 'none',
						backgroundColor: 'gray',
					}}
				/>
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
												<th scope='col'>AMOUNT</th>
												<th scope='col'>PAYMENT METHOD</th>
												<th scope='col'>STATUS</th>
												<th scope='col'>PAYED AMOUNT</th>
												<th scope='col'>TRACKING NUMBER</th>
												<th scope='col'>ACTIONS</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope='row'>1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>@mdo</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope='row'>2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>@mdo</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope='row'>3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
												<td>Otto</td>
												<td>@mdo</td>
												<td>@mdo</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
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
