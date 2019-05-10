import React from "react";
import { Router, Route, Switch } from "dva/router";
import ErrorBoundary from 'components/common/errorBoundary'
import SmallLoading from 'components/common/smallLoading'

import WithLoadable from "components/common/WithLoadable";

// // 组件
const Login = WithLoadable({
  loader: () => import("components/common/login"),
  
});
const Signup=WithLoadable({
	loader:()=>import('components/common/signup'),
	
})
const Home = WithLoadable({
  loader: () => import("routes/home"),
  
});
const Personal = WithLoadable({
  loader: () => import("routes/personal"),
  
});
const Classify = WithLoadable({
  loader: () => import("routes/classify"),
  
});
const ShopCart = WithLoadable({
  loader: () => import("routes/shopCart"),
  
});

const Balance = WithLoadable({
  loader: () => import("routes/balance"),
  
});
const SendTime = WithLoadable({
  loader: () => import("routes/balance/sendTime"),
  
});
const GoodDetail = WithLoadable({
  loader: () => import("routes/goodDetail"),
  
});
const FeedBack = WithLoadable({
  loader: () => import("routes/personal/feedback"),
  
});
const Collect = WithLoadable({
  loader: () => import("routes/personal/collect"),
  
});
const Avatar = WithLoadable({
  loader: () => import("routes/personal/avatar"),
  
});
const CommentList = WithLoadable({
  loader: () => import("routes/goodDetail/commentList"),
  
});
const CommentForm = WithLoadable({
  loader: () => import("routes/goodDetail/commentForm"),
  
});
const Orders = WithLoadable({
  loader: () => import("routes/orders"),
  
});
const OrderDetail = WithLoadable({
  loader: () => import("routes/orders/orderDetail"),
  
});
const BindPhone = WithLoadable({
  loader: () => import("routes/personal/bindPhone"),
  
});

export default function({ history }) {
  return (
    <ErrorBoundary>
      <Login/>
      <Signup/>
      <SmallLoading/>
      <Router history={history}>
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
          <Route path="/avatar" component={Avatar} />
          <Route path="/commentList/:goodId" component={CommentList} />
          <Route path="/commentForm/:goodId" component={CommentForm} />
          <Route path="/goodDetail/:goodId" component={GoodDetail} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
