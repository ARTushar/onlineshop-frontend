import React from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledCollapse,
	NavbarToggler,
} from 'reactstrap';
import '../assets/css/AdminProducts.css';
import '../assets/css/AdminSidebar.css';
import AdminSidebar from './AdminSidebar';


function AdminProducts() {
	return (
		<div className='adminProducts'>
			<Container className='adminhome__container'>
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
						products
						{/* products goes here */}
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default AdminProducts;
