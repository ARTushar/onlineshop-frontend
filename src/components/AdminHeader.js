import React from 'react';
import { Navbar } from 'reactstrap';
import Header from './Header';

function AdminHeader() {
  return (
		<React.Fragment>
			<Header />
      <Navbar>
      </Navbar>
		</React.Fragment>
	);
}

export default AdminHeader;
