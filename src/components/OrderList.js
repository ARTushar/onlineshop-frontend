import React, { useEffect } from 'react';
import { Container, Row, Table as TableBoostrap } from 'reactstrap';
import '../assets/css/OrderList.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../utils/context';
import CircularProgress from '@material-ui/core/CircularProgress'

import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function createData(orderNo, date, totalProducts, totalCost, status) {
  return { orderNo, date, totalProducts, totalCost, status: status.toUpperCase()};
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'orderNo', numeric: false, disablePadding: false, label: 'ORDER NO' },
  { id: 'date', numeric: true, disablePadding: false, label: 'DATE' },
  { id: 'totalProducts', numeric: true, disablePadding: false, label: 'TOTAL PRODUCTS' },
  { id: 'totalCost', numeric: true, disablePadding: false, label: 'TOTAL COST' },
  { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
];

function EnhancedTableHead(props) {
  const { classes,  order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    textAlign: 'center'
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableContainer: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75vw'
    }
  }
}));


const compareOrder = (a, b) => {
  let dataA = a.createdAt.toUpperCase();
  let dataB = b.createdAt.toUpperCase();

  if (dataA < dataB) return 1;
  if (dataA > dataB) return -1;

  return 0;
}

function OrderList() {

  const userContext = React.useContext(UserContext)
  const orders = userContext.orders;

  useEffect(() => {
    if (!userContext.orderLoaded) {
      userContext.fetchOrders();
    }
  }, [])

  let rows = [];
  for(const order of orders.sort(compareOrder)){
    rows.push(createData(order._id, order.createdAt, order.products.length, order.subTotalCost + order.deliveryCost, order.status));
  }

  console.log('order : ' + JSON.stringify(rows));
  console.log(typeof rows)


  const history = useHistory();

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <TableContainer className={classes.tableContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                    style={{
                      cursor: "pointer"
                    }}
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.orderNo}
                      onClick={() => history.push(`/order/${row.orderNo}`)}
                    >
                      <TableCell component="th" scope="row">
                        {row.orderNo}
                      </TableCell>
                      <TableCell align="right">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(row.date))}</TableCell>
                      <TableCell align="right">{row.totalProducts}</TableCell>
                      <TableCell align="right">{row.totalCost}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          size="small"
          align="left"
          style={{
            display: 'inline-flex',
            justifyContent: 'flex-start'
          }}
        />
      </Paper>
    </div>
  );

  // if (userContext.ordersLoading || !userContext.orderLoaded) {
  //   return (
  //     <div>
  //       <Container>
  //         <Row className="justify-content-center">
  //           <CircularProgress color="secondary" />
  //         </Row>
  //       </Container>
  //     </div>
  //   )
  // } else {
  //   return (
  //     // <div className="orderlist">
  //     //   <Container className="orderlist__container">
  //     //     <Row className="orderlist__row">
  //           <Table responsive bordered striped hover className="orderlist__table">
  //             <thead>
  //               <tr>
  //                 <th>ORDER NO</th>
  //                 <th>DATE</th>
  //                 <th>TOTAL PRODUCTS</th>
  //                 <th>TOTAL COST</th>
  //                 <th>STATUS</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {orders.sort(compareOrder).map(orderproduct => (
  //                 <tr key={orderproduct._id} onClick={() => history.push(`/order/${orderproduct._id}`)}>
  //                   <td className="orderlist__orderno">
  //                     <span>{orderproduct._id}</span>
  //                   </td>
  //                   <td className="orderlist__date">
  //                     <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(orderproduct.createdAt))}</span>
  //                   </td>
  //                   <td className="orderlist__totalproducts">
  //                     <span>{orderproduct.products.length}</span>
  //                   </td>
  //                   <td className="orderlist__totalcost">
  //                     <span>{orderproduct.subTotalCost + orderproduct.deliveryCost}</span>
  //                   </td>
  //                   <td className="orderlist__status">
  //                     <span>{orderproduct.status}</span>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </Table>
  //     //     {/* </Row> */}
  //     //   {/* </Container > */}
  //     // </div >
  //   )
  // }
}

export default OrderList;
