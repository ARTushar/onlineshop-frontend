import React from 'react';
import '../assets/css/Main.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

function AdminMain() {
	return (
		<div className='main'>
			<AdminHeader />
			<Switch>
				<Route path='/admin/home' component={() => <AdminHome />} />
				<Redirect to='/admin/home' />
			</Switch>
			<AdminFooter />
		</div>
	);
}

export default AdminMain;
