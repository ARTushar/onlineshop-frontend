import React from 'react';
import {
	Button,
} from 'reactstrap';
import '../assets/css/AdminDataTable.css';


import {
	useTable,
	usePagination,
	useSortBy,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
} from 'react-table';

// Define a default UI for filtering
function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<span>
			Search:{' '}
			<input
				className='form-control'
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records`}
			/>
		</span>
	);
}

function DefaultColumnFilter({
	column: { filterValue, preFilteredRows, setFilter },
}) {
	const count = preFilteredRows.length;

	return (
		<input
			className='form-control'
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
			placeholder={`Search ${count} records`}
		/>
	);
}

const Table = ({ columns, data }) => {
	const defaultColumn = React.useMemo(
		() => ({
			// Default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		getSortByToggleProps,
		headerGroups,
		prepareRow,
		page,
		rows,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<div className='adminDataTable table-responsive-lg'>
			{/* <GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={state.globalFilter}
				setGlobalFilter={setGlobalFilter}
			/> */}
			<table
				className='table table-striped table-bordered table-hover'
				style={{ minWidth: 800}}
				{...getTableProps()}
			>
				<thead className='thead-dark'>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								// Add the sorting props to control sorting. For this example
								// we can add them into the header props
								<th {...column.getHeaderProps(column.getSortByToggleProps())} className='adminDataTable__table__heading'>
									{column.render('Header')}
									{/* Add a sort direction indicator */}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{/* Render the columns filter UI */}
									<div>{column.canFilter ? column.render('Filter') : null}</div>
								</th>
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
									if (cell.column.Header !== 'ACTIONS')
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										);
									else
										return (
											<td
												className='table_row_action_buttons'
												{...cell.getCellProps()}
											>
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

const AdminDataTable = ({columnHeaders, dataTable}) => {
	const columns = React.useMemo(() => 
    [...columnHeaders],[]
	);

	return <Table columns={columns} data={dataTable} />;
};


export default AdminDataTable;
