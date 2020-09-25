import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import '../assets/css/AdminSidebar.css';


function AdminSidebar () {
	return (
		<React.Fragment>
			<Nav
				className='col-md-12 d-none d-md-block sidebar'
				activeKey='/home'
				onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
			>
				<div className='sidebar-sticky'></div>
				<NavItem>
					<NavLink to='/home'>Active</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey='link-1'>Link</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey='link-2'>Link</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey='disabled' disabled>
						Disabled
					</NavLink>
				</NavItem>
			</Nav>
		</React.Fragment>
	);
};

export default withRouter(AdminSidebar);
