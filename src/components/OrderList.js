import React from 'react';
import { Container, Row, Table } from 'reactstrap';
import '../assets/css/OrderList.css';
import { ORDERS } from '../shared/orders';
import { useTable } from 'react-table';
import { Link, Router, useHistory } from 'react-router-dom';


function OrderList() {

  const data = React.useMemo(
    () => 
      ORDERS.map(orderproduct => ({
        order_no: orderproduct.serial_no,
        date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(orderproduct.timestamp)),
        total_products: orderproduct.products_list.length,
        total_cost: orderproduct.total_cost,
        status: orderproduct.status
      }))
    
  );

  const columns = React.useMemo(
    () => [{
        Header: 'ORDER NO',
        accessor: 'order_no'
      }, {
        Header: 'DATE',
        accessor: 'date',
      },{
        Header: 'TOTAL PRODUCTS',
        accessor: 'total_products'
      }, {
        Header: 'TOTAL COST',
        accessor: 'total_cost',
      }, {
        Header: 'STATUS',
        accessor: 'status'
      }
    ]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const history = useHistory();

  return (
    <div className="orderlist">
      <Container className="orderlist__container">
        <Row className="orderlist__row">
          <Table hover {...getTableProps()} className="orderlist__table">
            {/* <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead> */}
            <thead>
            <th>ORDER NO</th>
                <th>DATE</th>
                <th>TOTAL PRODUCTS</th>
                <th>TOTAL COST</th>
                <th>STATUS</th>
            </thead>
            <tbody>
            {ORDERS.map(orderproduct => (
                <tr onClick={()=> history.push(`/order/${orderproduct.serial_no}`)}>
                  <td className="orderlist__orderno">
                    <span>{orderproduct.serial_no}</span>
                  </td>
                  <td className="orderlist__date">
                    <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour:'2-digit', minute: "2-digit" }).format(new Date(orderproduct.timestamp))}</span>
                  </td>
                  <td className="orderlist__totalproducts">
                    <span>{orderproduct.products_list.length}</span>
                  </td>
                  <td className="orderlist__totalcost">
                    <span>{orderproduct.total_cost}</span>
                  </td>
                  <td className="orderlist__status">
                    <span>{orderproduct.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                 
                      <tr {...row.getRowProps()
                  } >
                  {
                    row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })
                  }
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Row>
      </Container >
    </div >
  )
}

export default OrderList;
