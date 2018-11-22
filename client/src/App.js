import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable';
import Login from 'components/common-components/login'
import Signup from 'components/common-components/signup'
import SmallLoading from 'components/common-components/smallLoading'
import Loading from 'components/common-components/loading'

import event from 'utils/event'
// 组件

const Home=Loadable({
	loader:()=>import('views/home'),
	loading: Loading,
})
const Personal=Loadable({
	loader:()=>import('views/personal'),
	loading: Loading,
})
const Classify=Loadable({
	loader:()=>import('views/classify'),
	loading: Loading,
})
const ShopCart=Loadable({
	loader:()=>import('views/shopCart'),
	loading: Loading,
})

const Balance=Loadable({
	loader:()=>import('views/balance'),
	loading: Loading,
})
const SendTime=Loadable({
	loader:()=>import('views/balance/sendTime'),
	loading: Loading,
})
const GoodDetail=Loadable({
	loader:()=>import('views/goodDetail'),
	loading: Loading,
})
const FeedBack=Loadable({
	loader:()=>import('views/personal/feedback'),
	loading: Loading,
})
const Collect=Loadable({
	loader:()=>import('views/personal/collect'),
	loading: Loading,
})
const Orders=Loadable({
	loader:()=>import('views/orders'),
	loading: Loading,
})
const OrderDetail=Loadable({
	loader:()=>import('views/orders/orderDetail'),
	loading: Loading,
})
const BindPhone=Loadable({
	loader:()=>import('views/personal/bindPhone'),
	loading: Loading,
})
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
						<Route path="/orderDetail/:orderId" component={OrderDetail} />
						<Route path="/bindPhone" component={BindPhone} />
						<Route path="/collect" component={Collect} />

						<Route path="/goodDetail/:goodId" component={GoodDetail} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}