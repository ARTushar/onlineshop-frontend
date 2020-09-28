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

import { useTable, usePagination } from 'react-table';

const Table = ({columns, data}) => {

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		usePagination
	);

	return (
		<div className='table-responsive-md'>
			<table
				className='table table-striped table-bordered table-hover'
				style={{ minWidth: 800 }}
				{...getTableProps()}
			>
				<thead className='thead-dark'>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									console.log(cell.column.Header);
									if (cell.column.Header !== 'ACTIONS')
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									else 
										return (
											<td className='table_row_action_buttons' {...cell.getCellProps()}>
												<Button className='btn btn-sm'>View</Button>
												<Button className='btn btn-sm'>Cancel</Button>
											</td>
										);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
			<ul className='pagination'>
				<li
					className='page-item'
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					<a className='page-link'>First</a>
				</li>
				<li
					className='page-item'
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					<a className='page-link'>{'<'}</a>
				</li>
				<li
					className='page-item'
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					<a className='page-link'>{'>'}</a>
				</li>
				<li
					className='page-item'
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					<a className='page-link'>Last</a>
				</li>
				<li>
					<a className='page-link'>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{' '}
					</a>
				</li>
				<li>
					<a className='page-link'>
						<input
							className='form-control'
							type='number'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '100px', height: '20px' }}
						/>
					</a>
				</li>{' '}
				<select
					className='form-control'
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
					style={{ width: '120px', height: '38px' }}
				>
					{[5, 10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</ul>
		</div>
	);
};

const OrdersTable = () => {
	const columns = React.useMemo(() => [
		{
			Header: 'Orders Table',
			columns: [
				{
					Header: 'ORDER#',
					accessor: 'order',
				},
				{
					Header: 'CUSTOMER',
					accessor: 'customer',
				},
				{
					Header: 'SHIP TO',
					accessor: 'ship_to',
				},
				{
					Header: 'TOTAL AMOUNT',
					accessor: 'total',
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
			],
		},
	]);

	let data = [];
	ORDERS.map((order) => {
		data.push({
			order: order.serial_no,
			customer: order.user,
			total: order.total_cost,
			status: order.status,
			ship_to: order.shipping_address,
			payment_method: order.payment_method,
			payed_amount: order.payed_amount,
			actions: () => (
				<React.Fragment>
					<Button>view</Button>
					<Button>cancel</Button>
				</React.Fragment>
			),
		});
	})

	return (
		<Table columns={columns} data={data} />
	);
}

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
								<OrdersTable />
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
