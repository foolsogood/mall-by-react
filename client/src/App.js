import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// 组件
import Bundle from 'components/common-components/bundle'
import Home from 'views/home'
import Personal from 'views/personal'
import Classify from 'views/classify'
import ShopCart from 'views/shopCart'
import Login from 'components/common-components/login'
import Signup from 'components/common-components/signup'
import SmallLoading from 'components/common-components/smallLoading'

import event from 'utils/event'
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
const BindPhone = (props) => (
	<Bundle load={() => import('views/personal/bindPhone')}>
		{(BindPhone) => <BindPhone {...props} />}
	</Bundle>
)
export default class App extends Component {
	constructor() {
		super()
		this.state = {
			ifLoginShow: false,
			ifSignupShow: false,
		}
	};
	componentDidMount() {
		event.on('showLogin', bool => {
			this.setState({ ifLoginShow: bool })
		})
		event.on('showSignup', bool => {
			this.setState({ ifSignupShow: bool })
		})
		
	}
	render() {
		const { ifLoginShow, ifSignupShow } = this.state

		return (
			<div>
				{
					ifLoginShow ? <Login /> : null
				}
				{
					ifSignupShow ? <Signup /> : null
				}
				<SmallLoading  />
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
						<Route path="/bindPhone" component={BindPhone} />

						<Route path="/goodDetail/:goodId" component={GoodDetail} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}