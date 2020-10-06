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
import AdminDataTable from './AdminDataTable';
import { ORDERS } from '../shared/orders';
import { exportTableToPDF } from '../shared/AdminFunctions';

import MenuIcon from '@material-ui/icons/Menu';
import PrintIcon from '@material-ui/icons/Print';

// import {
// 	Document,
// 	Page,
// 	Text,
// 	View,
// 	StyleSheet,
// 	PDFViewer,
// 	PDFDownloadLink,
// } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
// 	page: {
// 		flexDirection: 'row',
// 		backgroundColor: '#E4E4E4',
// 	},
// 	section: {
// 		margin: 10,
// 		padding: 10,
// 		flexGrow: 1,
// 	},
// });

// Create Document Component


function AdminOrders() {
	const columnHeaders = [
		{
			Header: 'ORDER#',
			accessor: 'serial_no',
		},
		{
			Header: 'CUSTOMER',
			accessor: 'user',
		},
		{
			Header: 'SHIP TO',
			accessor: 'shipping_address',
		},
		{
			Header: 'TOTAL AMOUNT',
			accessor: 'total_cost',
		},
		{
			Header: 'STATUS',
			accessor: 'status',
		},
		{
			Header: 'PAYMENT METHOD',
			accessor: 'payment_method',
		},
		{
			Header: 'PAYED AMOUNT',
			accessor: 'payed_amount',
		},
		{
			Header: 'ACTIONS',
			accessor: 'actions',
		},
	];

	// const PDFTable = ({ columnHeaderss, dataTable }) => (
	// 	<Document>
	// 		<Page size='A4'>
	// 			<View>
	// 				<table className='table table-striped table-bordered'>
	// 					<thead className='thead-dark'>
	// 						{console.log(columnHeaderss)}
	// 						<tr>
	// 							{columnHeaderss.map((column) => (
	// 								// Add the sorting props to control sorting. For this example
	// 								// we can add them into the header props
	// 								<th>
	// 									{column.Header}
	// 									{/* Add a sort direction indicator */}
	// 								</th>
	// 							))}
	// 						</tr>
	// 					</thead>
	// 					<tbody>
	// 						{dataTable.map((row) => {
	// 							return (
	// 								<tr>
	// 									{Object.keys(row).map((key) => (
	// 										<td>{row.key}</td>
	// 									))}
	// 								</tr>
	// 							);
	// 						})}
	// 					</tbody>
	// 				</table>
	// 			</View>
	// 		</Page>
	// 	</Document>
	// );

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
						<Container className='admin__table__container'>
							<Row className='admin__table__container__row__ordersHeader'>
								<h4 className='admin__table__container__heading'>ORDERS</h4>
								{/* <Link to='/admin/addproduct'> */}
								<Button onClick={() => {exportTableToPDF(columnHeaders, ORDERS)}} className='admin__printButton'>
									{/* <PDFDownloadLink
										document={
											<PDFTable
												columnHeaderss={columnHeaders}
												dataTable={ORDERS}
											/>
										}
										fileName='demo.pdf'
									> */}
									<PrintIcon></PrintIcon>
									{/* </PDFDownloadLink> */}
								</Button>
								{/* </Link> */}
							</Row>
							<Row className='admin__table__container__row'>
								<AdminDataTable
									columnHeaders={columnHeaders}
									dataTable={ORDERS}
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

export default AdminOrders;
