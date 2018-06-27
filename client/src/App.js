import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// 组件
import Home from 'views/home'
import Personal from 'views/personal'
import Classify from 'views/classify'
import ShopCart from 'views/shopCart'
import Balance from 'views/balance'
import SendTime from 'views/balance/sendTime'
import GoodDetail from 'views/goodDetail'
import FeedBack from 'views/personal/feedback'
// import { createHistory } from 'history'
// const history = createHistory()
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
						<Route path="/goodDetail/:cateId/:id" component={GoodDetail} />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}