import React from 'react';
import { Container, Row, Table } from 'reactstrap';
import '../assets/css/OrderList.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/context';


function OrderList() {

  const orders = React.useContext(UserContext).orders;

  // const data = React.useMemo(
  //   () => 
  //     ORDERS.map(orderproduct => ({
  //       order_no: orderproduct.serial_no,
  //       date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(orderproduct.timestamp)),
  //       total_products: orderproduct.products_list.length,
  //       total_cost: orderproduct.total_cost,
  //       status: orderproduct.status
  //     }))
    
  // );

  // const columns = React.useMemo(
  //   () => [{
  //       Header: 'ORDER NO',
  //       accessor: 'order_no'
  //     }, {
  //       Header: 'DATE',
  //       accessor: 'date',
  //     },{
  //       Header: 'TOTAL PRODUCTS',
  //       accessor: 'total_products'
  //     }, {
  //       Header: 'TOTAL COST',
  //       accessor: 'total_cost',
  //     }, {
  //       Header: 'STATUS',
  //       accessor: 'status'
  //     }
  //   ]
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, data });

  const history = useHistory();

  return (
    <div className="orderlist">
      <Container className="orderlist__container">
        <Row className="orderlist__row">
          {/* <Table hover {...getTableProps()} className="orderlist__table">
            <thead>
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
          <Table responsive bordered striped hover className="orderlist__table">
            <thead>
              <th>ORDER NO</th>
              <th>DATE</th>
              <th>TOTAL PRODUCTS</th>
              <th>TOTAL COST</th>
              <th>STATUS</th>
            </thead>
            <tbody>
              {orders.map(orderproduct => (
                <tr onClick={() => history.push(`/order/${orderproduct._id}`)}>
                  <td className="orderlist__orderno">
                    <span>{orderproduct._id}</span>
                  </td>
                  <td className="orderlist__date">
                    <span>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: "2-digit" }).format(new Date(orderproduct.createdAt))}</span>
                  </td>
                  <td className="orderlist__totalproducts">
                    <span>{orderproduct.products.length}</span>
                  </td>
                  <td className="orderlist__totalcost">
                    <span>{orderproduct.subTotalCost + orderproduct.deliveryCost}</span>
                  </td>
                  <td className="orderlist__status">
                    <span>{orderproduct.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tbody {...getTableBodyProps()}>
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
            </tbody> */}
          </Table>
        </Row>
      </Container >
    </div >
  )
}

export default OrderList;
