import React from 'react';
import '../assets/css/OrderInvoice.css';
import { Container, Row, Col, Table } from 'reactstrap';
import OrderTotal from './OrderTotal';
import OrderProductSmall from './OrderProductSmall';
import OrderProduct from './OrderProduct';

function OrderInvoice({ order_no, orders }) {
	const order = orders.filter((order) => order.serialNo == order_no)[0];

	return (
		<div className='orderinvoice'>
			<Container className='orderinvoice__container'>
				<Row className='orderinvoice__heading'>
					<span>Ordered Products: </span>
				</Row>
				<Row className='orderinvoice__row'>
					<Col xs='12' lg='7' className='orderinvoice__products'>
						<div className='orderinvoice__products__header d-sm-none'>
							{order.products.map((orderproduct) => (
								<OrderProductSmall
									id={orderproduct.id}
									slug={orderproduct.slug}
									image={orderproduct.image}
									title={orderproduct.title}
									price={orderproduct.price}
									q={orderproduct.quantity}
								/>
							))}
						</div>
						<Table className='d-none d-sm-block'>
							<thead>
								<tr>
									<th></th>
									<th>PRODUCT</th>
									<th>PRICE</th>
									<th>QUANTITY</th>
									<th>SUBTOTAL</th>
								</tr>
							</thead>
							<tbody>
								{order.products.map((orderproduct) => (
									<OrderProduct
										id={orderproduct.id}
										slug={orderproduct.slug}
										image={orderproduct.image}
										title={orderproduct.title}
										price={orderproduct.price}
										q={orderproduct.quantity}
									/>
								))}
							</tbody>
						</Table>
					</Col>
					<Col lg='5' className='orderinvoice__totals'>
						<OrderTotal order={order} />
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default OrderInvoice;
