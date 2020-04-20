# 客户端
### 部分页面预览
<div>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/home.jpeg" style="display:inline-block;padding:20px" width="200" alt="首页"/>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/classify.jpeg" style="display:inline-block;padding:20px" width="200" alt="分类"/>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/cart1.jpeg" style="display:inline-block;padding:20px" width="200" alt="购物车"/>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/cart.jpeg" style="display:inline-block;padding:20px" width="200" alt="购物车"/>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/detail.jpeg" style="display:inline-block;padding:20px" width="200" alt="详情"/>
<img src="https://mall-server-upload.oss-cn-shenzhen.aliyuncs.com/comment.jpeg" style="display:inline-block;padding:20px" width="200" alt="评论"/>
</div>

### usage
- 1.如果不需要egg服务端，可使用前端mock命令提供数据，只支持get
  ```
   yarn mock  or npm run mock
  ```
- 2.使用midway做服务端
   将config/config.default.ts 中 redis，sequelize等修改为自己本地配置, yarn dev 即可

### tips 

首先，这是一个react新手写的练手项目，有不对的地方请包涵(2017.08)。<br/>
现client-use-dva已用typescript重构(2019.5)<br/>
这是用react写的一个商城，比较简单。脚手架采用create-react-app。ui采用antd。
技术栈:react,react-router v4,dva等。
写这个过程中遇到的一些重难点(或者是踩过的坑比较贴切),只贴关键代码：<br/>
### reacr-router v4。
- 1.路由传值<br/>
在路由配置中注入 history,然后把参数写在Route组件中
```
 <Route path="/goodDetail/:goodId" component={GoodDetail} />
 ```
 在页面中用<Link>组件传值：<br/>
 ```
    <Link to={`/goodDetail/${good.goodId}`}>
 ``` 
 在事件中传值<br/>
 ```
 1.引入 import PropTypes from 'prop-types',
 2.声明router类型 static contextTypes = {
        router: PropTypes.object
  };
 3.this.context.router.history.push({
            pathname: '/goodDetail',
            query:{
              cateId:xxx,
              goodId:xxx
            }
        })
```
<br/>
- 2.路由获取参数<br/>
在componentDidMount函数中
 let {goodId} = this.props.match.params<br/>
- 3.获取当前路由路径<br/>
window.location.pathname<br/>

### 结合生命周期可以做的一些事
如果在componentDidMount添加了一些事件监听或者定时器之类的,要在componentWillUnmount里面清掉它们。如果是有一些setState操作的还要格外注意,因为setState是异步的，离开当前组件时不一定能马上消除掉事件监听或者定时器的影响，可以添加一个变量为false,在componentWillUnmount里面把它改为true,每次setState之前都要判断该变量，为false才能操作之类(详细可看首页相关)<br/>
### 循环渲染
如果我要渲染的是一个集合goodList，可以这样 <br/>
```
Object.keys(goodList).map((item)=>{
  return (
    <div key={goodList[item].goodId}>.....</div>
  )<br/>
})
```
而不是一定要拿到数组才能渲染,key的话最好不要用索引，而是用一些商品id,用户id之类<br/>
### 状态管理
 - 1. 使用dva 
### 路由按需加载
  使用react-loadable
  ```
  import Loadable from 'react-loadable';
  const Home=Loadable({
	  loader:()=>import('views/home'),
	  loading: Loading,
  })
  ```
  
  ```
	<Route exact path="/" component={Home} />
  ```
### 高阶组件
项目中使用装饰器连接高阶组件更优雅 如dva的connect和mobx中的observer以及页面布局使用的公共组件WithFooter WithHeader等
```
@connect
@WithFooter
class Home extends Component {}
```
### 组件通信
  使用node 的event模块的EventEmitter类可满足一般的父子组件或兄弟组件通信

## TODO hook重写

***

# 服务端
框架采用midway,数据库 mysql,orm用sequelize-typescript,后端缓存用 redis<br/>
主要实现如下接口：登录注册、获取各分类商品、商品查询、商品评论、商品收藏、提交订单和订单查询、上传头像或图片、绑定手机、发送短信验证码等

