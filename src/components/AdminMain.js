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
			<AdminHome />
			<AdminFooter />
		</div>
	);
}

export default AdminMain;
