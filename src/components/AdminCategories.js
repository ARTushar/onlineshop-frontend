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

import '../assets/css/Admin.css';
import '../assets/css/AdminSidebar.css';
import AdminSidebar from './AdminSidebar';

import MenuIcon from '@material-ui/icons/Menu';

function AdminCategories() {
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
          <Col>
          <Container className='admin__categoryContainer'>
            <div>Hello category</div>
          </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminCategories;
