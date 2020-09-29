import React from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import '../assets/css/AdminSidebar.css';


function AdminSidebar () {
	return (
		<React.Fragment>
			<Nav vertical className='col-md-12 sidebar'>
				<div className='sidebar-sticky'>
					<NavItem>
						<Link className='nav-link' to='/admin/home'>Analytics</Link>
					</NavItem>
					<NavItem>
						<Link className='nav-link' to='/admin/orders'>Orders</Link>
					</NavItem>
					<NavItem>
						<Link className='nav-link' to='/admin/products'>
							Products
						</Link>
					</NavItem>
					<NavItem>
						<Link className='nav-link' to='/admin/notifications'>
							Notifications
						</Link>
					</NavItem>
					<NavItem>
						<Link className='nav-link' to='/admin/categories'>
							Categories
						</Link>
					</NavItem>
					<NavItem>
						<Link className='nav-link' to='/admin/customers'>
							Customers
						</Link>
					</NavItem>
				</div>
			</Nav>
		</React.Fragment>
	);
};

export default withRouter(AdminSidebar);
