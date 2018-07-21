import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// 组件
import Bundle from 'components/common-components/bundle'
// const Home = (props) => (
// 	<Bundle load={() => import('views/home')}>
// 		{(Home) => <Home {...props} />}
// 	</Bundle>
// )
// const Personal = (props) => (
// 	<Bundle load={() => import('views/personal')}>
// 		{(Personal) => <Personal {...props} />}
// 	</Bundle>
// )
// const Classify = (props) => (
// 	<Bundle load={() => import('views/classify')}>
// 		{(Classify) => <Classify {...props} />}
// 	</Bundle>
// )
// const ShopCart = (props) => (
// 	<Bundle load={() => import('views/shopCart')}>
// 		{(ShopCart) => <ShopCart {...props} />}
// 	</Bundle>
// )
import Home from 'views/home'
import Personal from 'views/personal'
import Classify from 'views/classify'
import ShopCart from 'views/shopCart'
const Balance = (props) => (
	<Bundle load={() => import('views/balance')}>
		{(Balance) => <Balance {...props} />}
	</Bundle>
)
const SendTime = (props) => (
	<Bundle load={() => import('views/balance/sendTime')}>
		{(SendTime) => <SendTime {...props} />}
	</Bundle>
)
const GoodDetail = (props) => (
	<Bundle load={() => import('views/goodDetail')}>
		{(GoodDetail) => <GoodDetail {...props} />}
	</Bundle>
)
const FeedBack = (props) => (
	<Bundle load={() => import('views/personal/feedback')}>
		{(FeedBack) => <FeedBack {...props} />}
	</Bundle>
)
const Orders = (props) => (
	<Bundle load={() => import('views/orders')}>
		{(Orders) => <Orders {...props} />}
	</Bundle>
)
const OrderDetail = (props) => (
	<Bundle load={() => import('views/orders/orderDetail')}>
		{(OrderDetail) => <OrderDetail {...props} />}
	</Bundle>
)
export default class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter >
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/personal" component={Personal} />
						<Route path="/feedback" component={FeedBack} />
						<Route path="/classify" component={Classify} />
						<Route path="/balance" component={Balance} />
						<Route path="/sendTime" component={SendTime} />
						<Route path="/shopCart" component={ShopCart} />
						<Route path="/orders" component={Orders} />
						<Route path="/orderDetail/:goodId" component={OrderDetail} />

						<Route path="/goodDetail/:goodId" component={GoodDetail} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}