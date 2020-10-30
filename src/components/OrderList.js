import React, { useEffect } from 'react';
import { Container, Row, Table } from 'reactstrap';
import '../assets/css/OrderList.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/context';
import CircularProgress from '@material-ui/core/CircularProgress'

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

  const history = useHistory();

  if (userContext.ordersLoading || !userContext.orderLoaded) {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <CircularProgress color="secondary" />
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div className="orderlist">
        <Container className="orderlist__container">
          <Row className="orderlist__row">
            <Table responsive bordered striped hover className="orderlist__table">
              <thead>
                <tr>
                <th>ORDER NO</th>
                <th>DATE</th>
                <th>TOTAL PRODUCTS</th>
                <th>TOTAL COST</th>
                <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.sort(compareOrder).map(orderproduct => (
                  <tr key={orderproduct._id} onClick={() => history.push(`/order/${orderproduct._id}`)}>
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
            </Table>
          </Row>
        </Container >
      </div >
    )
  }
}

export default OrderList;
