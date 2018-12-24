import React from "react";
import { Router, Route, Switch } from "dva/router";
import Loadable from "react-loadable";
import Loading from "components/common-components/loading";
import SmallLoading from 'components/common-components/smallLoading'

// // 组件
const Login = Loadable({
  loader: () => import("components/common-components/login"),
  loading: Loading
});
const Signup=Loadable({
	loader:()=>import('components/common-components/signup'),
	loading: Loading,
})
const Home = Loadable({
  loader: () => import("routes/home"),
  loading: Loading
});
const Personal = Loadable({
  loader: () => import("routes/personal"),
  loading: Loading
});
const Classify = Loadable({
  loader: () => import("routes/classify"),
  loading: Loading
});
const ShopCart = Loadable({
  loader: () => import("routes/shopCart"),
  loading: Loading
});

const Balance = Loadable({
  loader: () => import("routes/balance"),
  loading: Loading
});
const SendTime = Loadable({
  loader: () => import("routes/balance/sendTime"),
  loading: Loading
});
const GoodDetail = Loadable({
  loader: () => import("routes/goodDetail"),
  loading: Loading
});
const FeedBack = Loadable({
  loader: () => import("routes/personal/feedback"),
  loading: Loading
});
const Collect = Loadable({
  loader: () => import("routes/personal/collect"),
  loading: Loading
});
const Avatar = Loadable({
  loader: () => import("routes/personal/avatar"),
  loading: Loading
});
const CommentList = Loadable({
  loader: () => import("routes/goodDetail/commentList"),
  loading: Loading
});
const CommentForm = Loadable({
  loader: () => import("routes/goodDetail/commentForm"),
  loading: Loading
});
const Orders = Loadable({
  loader: () => import("routes/orders"),
  loading: Loading
});
const OrderDetail = Loadable({
  loader: () => import("routes/orders/orderDetail"),
  loading: Loading
});
const BindPhone = Loadable({
  loader: () => import("routes/personal/bindPhone"),
  loading: Loading
});

function RouterConfig({ history }) {
  return (
    <div>
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
    </div>
  );
}
export default  RouterConfig;
