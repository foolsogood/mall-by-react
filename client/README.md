## 客户端
首先，这是一个react新手写的练手项目，有不对的地方请包涵。
这是用react写的一个商城，比较简单。脚手架采用create-react-app。ui采用antd。
技术栈:react,react-router v4,mobx等。
写这个过程中遇到的一些重难点(或者是踩过的坑比较贴切),只贴关键代码：<br/>
- 1.reacr-router v4。
(1).路由传值
在路由配置中注入 history,然后把参数写在Route组件中
```
 <Route path="/goodDetail/:cateId/:id" component={GoodDetail} />
 ```
 在页面中用<Link>组件传值：<br/>
 ```
    <Link to={`/goodDetail/${good.cateId}/${good.goodId}`}>
 ``` 
 在事件中传值<br/>
 ```
 ①引入 import PropTypes from 'prop-types',
 ②声明router类型 static contextTypes = {
        router: PropTypes.object
  };
 ③ this.context.router.history.push({
            pathname: '/goodDetail',
            query:{
              cateId:xxx,
              goodId:xxx
            }
        })
```
<br/>
(2)路由获取参数
在componentDidMount函数中
 let goodId = this.props.match.params.id<br/>
(3)获取当前路由路径
window.location.pathname<br/>

- 2.结合生命周期可以做的一些事
如果在componentDidMount添加了一些事件监听或者定时器之类的,要在componentWillUnmount里面清掉它们。如果是有一些setState操作的还要格外注意,因为setState是异步的，离开当前组件时不一定能马上消除掉事件监听或者定时器的影响，可以添加一个变量为false,在componentWillUnmount里面把它改为true,每次setState之前都要判断该变量，为false才能操作之类(详细可看首页相关)<br/>
- 3.循环渲染
如果我要渲染的是一个集合goodList，可以这样 <br/>
Object.keys(goodList).map((item)=>{<br/>
  return (<br/>
    ```<div key={goodList[item].goodId}>.....</div>```
  )<br/>
})<br/>
而不是一定要拿到数组才能渲染,key的话最好不要用索引，而是用一些商品id,用户id之类<br/>
- 4.状态管理我用的是mobx，这里面是用在购物车中，购物车还结合了localStorage,而结算是结合sessionStrage,还是有瑕疵。
但对于mobx的学习使用还是足够的，由于create-react-app好像不支持@装饰器,就用
 extendObservable 模式
 在对应的页面中引入react-mobx连接react和mobx ，当然状态本身也要引入<br/>
import { observer } from 'mobx-react'<br/>
import store from '../../store'<br/>
const cart = observer(class cartList extends Component {
  ......
}<br/>
export default cart<br/>
然后在这个页面中直接获取store中的数据

## 服务端
mockServer文件夹，数据来源是用mock的。而server.js是用koa做的本地web服务</br>
用法: 在mockServer路径下 node ./server.js 即可