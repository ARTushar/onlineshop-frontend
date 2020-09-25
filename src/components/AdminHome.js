import React from 'react';
import { Container } from 'reactstrap';
import '../assets/css/AdminHome.css';

import TouchAppIcon from '@material-ui/icons/TouchApp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DirectionsIcon from '@material-ui/icons/Directions';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SpeedIcon from '@material-ui/icons/Speed';

import { Chart } from 'react-charts';

var CanvasJSReact = require('../canvasjs/canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AdminHeader() {
  const data = React.useMemo(
		() => [
			{
				label: 'Series 1',
				data: [
					[0, 1],
					[1, 2],
					[2, 4],
					[3, 2],
					[4, 7],
				],
			},
			{
				label: 'Series 2',
				data: [
					[0, 3],
					[1, 1],
					[2, 5],
					[3, 6],
					[4, 4],
				],
			},
		],
		[]
	);

	const axes = React.useMemo(
		() => [
			{ primary: true, type: 'linear', position: 'bottom' },
			{ type: 'linear', position: 'left' },
		],
		[]
  );

  const axes2 = React.useMemo(
		() => [
			{ primary: true, type: 'ordinal', position: 'bottom' },
			{ type: 'linear', position: 'left' },
		],
		[]
  );
  
  const series = React.useMemo(
		() => ({
			type: 'bar',
		}),
		[]
	);
  
	return (
		<div className='adminhome'>
			<Container className='adminhome__container'>
				<div class='row'>
					<div class='col-xl-3 col-md-6'>
						<div class='card card-stats adminhome__card'>
							{/* <!-- Card body --> */}
							<div class='card-body'>
								<div class='row'>
									<div class='col'>
										<h5 class='card-title text-uppercase text-muted mb-0'>
											Total traffic
										</h5>
										<span class='h2 font-weight-bold mb-0'>350,897</span>
									</div>
									<div class='col-auto'>
										<div class='icon icon-shape bg-danger rounded-circle shadow'>
											<TouchAppIcon></TouchAppIcon>
										</div>
									</div>
								</div>
								<p class='mt-3 mb-0 text-sm'>
									<span class='text-success mr-2'>
										<ArrowUpwardIcon></ArrowUpwardIcon> 3.48%
									</span>
									<span class='text-nowrap'>Since last month</span>
								</p>
							</div>
						</div>
					</div>
					<div class='col-xl-3 col-md-6'>
						<div class='card card-stats adminhome__card'>
							{/* <!-- Card body --> */}
							<div class='card-body'>
								<div class='row'>
									<div class='col'>
										<h5 class='card-title text-uppercase text-muted mb-0'>
											New users
										</h5>
										<span class='h2 font-weight-bold mb-0'>2,356</span>
									</div>
									<div class='col-auto'>
										<div class='icon icon-shape bg-warning rounded-circle shadow'>
											<DirectionsIcon></DirectionsIcon>
										</div>
									</div>
								</div>
								<p class='mt-3 mb-0 text-sm'>
									<span class='text-success mr-2'>
										<ArrowUpwardIcon></ArrowUpwardIcon> 3.48%
									</span>
									<span class='text-nowrap'>Since last month</span>
								</p>
							</div>
						</div>
					</div>
					<div class='col-xl-3 col-md-6'>
						<div class='card card-stats adminhome__card'>
							{/* <!-- Card body --> */}
							<div class='card-body'>
								<div class='row'>
									<div class='col'>
										<h5 class='card-title text-uppercase text-muted mb-0'>
											Sales
										</h5>
										<span class='h2 font-weight-bold mb-0'>924</span>
									</div>
									<div class='col-auto'>
										<div class='icon icon-shape bg-success rounded-circle shadow'>
											<MonetizationOnIcon></MonetizationOnIcon>
										</div>
									</div>
								</div>
								<p class='mt-3 mb-0 text-sm'>
									<span class='text-success mr-2'>
										<ArrowUpwardIcon></ArrowUpwardIcon> 3.48%
									</span>
									<span class='text-nowrap'>Since last month</span>
								</p>
							</div>
						</div>
					</div>
					<div class='col-xl-3 col-md-6'>
						<div class='card card-stats adminhome__card'>
							{/* <!-- Card body --> */}
							<div class='card-body'>
								<div class='row'>
									<div class='col'>
										<h5 class='card-title text-uppercase text-muted mb-0'>
											Performance
										</h5>
										<span class='h2 font-weight-bold mb-0'>49,65%</span>
									</div>
									<div class='col-auto'>
										<div class='icon icon-shape bg-primary rounded-circle shadow'>
											<SpeedIcon></SpeedIcon>
										</div>
									</div>
								</div>
								<p class='mt-3 mb-0 text-sm'>
									<span class='text-success mr-2'>
										<ArrowUpwardIcon></ArrowUpwardIcon> 3.48%
									</span>
									<span class='text-nowrap'>Since last month</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class='row'>
					<div class='col-xl-8'>
						<div class='card bg-default adminhome__chart'>
							<div class='card-header bg-transparent'>
								<div class='row align-items-center'>
									<div class='col'>
										<h6 class='text-uppercase ls-1 mb-1'>Overview</h6>
										<h5 class='h3 mb-0'>Sales value</h5>
									</div>
								</div>
							</div>
							<div class='card-body adminhome__chart__body'>
								{/* <!-- Chart --> */}
								<div class='chart'>
									{/* <!-- Chart wrapper --> */}
									{/* <canvas id='chart-sales-dark' class='chart-canvas'></canvas> */}
									{/* <CanvasJSChart options={chartoptions} /> */}
									<div
										style={{
											width: 'inherit',
											height: '300px',
										}}
									>
										<Chart data={data} axes={axes} />
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class='col-xl-4'>
						<div class='card adminhome__chart'>
							<div class='card-header bg-transparent'>
								<div class='row align-items-center'>
									<div class='col'>
										<h6 class='text-uppercase text-muted ls-1 mb-1'>
											Performance
										</h6>
										<h5 class='h3 mb-0'>Total orders</h5>
									</div>
								</div>
							</div>
							<div class='card-body adminhome__chart__body'>
								{/* <!-- Chart --> */}
								<div class='chart'>
									{/* <canvas id='chart-bars' class='chart-canvas'></canvas> */}
									<div
										style={{
											width: 'inherit',
											height: '300px',
										}}
									>
										<Chart data={data} series={series} axes={axes2} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default AdminHeader;
