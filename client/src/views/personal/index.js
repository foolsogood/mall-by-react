import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'

//组件
import WithHeader from 'components/common-components/withHeader'
import WithFooter from 'components/common-components/withFooter'

//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
@observer
@WithHeader({ifBackShow:false,titleText:'个人主页'})
@WithFooter

 class Personal extends PureComponent {
	render() {
		const iconStyle = { fontSize: '.35rem' }
		const common = { color: '#8a8a8a' }
		return (
			<div className="personal">
				<div className="personal-header">
					<img className="bg" src={require('assets/img/people_bg.png')} alt="" />
					<div className="info ">
						<Row className="flex-box">
							<Col span={6} >
								<div className="flex-box">
									<img className="avatar " src={require('assets/img/avatar.jpg')} alt="" />
								</div>
							</Col>
							<Col span={18}><span>{store.user.user&&store.user.user.username}</span></Col>
						</Row>
					</div>
				</div>
				<div className="hr"></div>
				<div>
					<Link to={`/orders`}>
						<div className="flex-box flex-ju-c-bt h-80 bg-fff pd-h-20">
							<span>我的订单</span>
							<div className="flex-box">
								<span>全部订单</span>
								<span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

							</div>
						</div>
					</Link>
					<div className="flex-box bg-fff pd-v-20 bd-top">
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={require('assets/img/ic-paying.png')} alt="" />
							<span>待付款</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={require('assets/img/ic-delivering.png')} alt="" />
							<span>待发货</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={require('assets/img/ic-evaluate.png')} alt="" />
							<span>待收货</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={require('assets/img/ic-refund.png')} alt="" />
							<span>待评价</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={require('assets/img/ic-receipting.png')} alt="" />
							<span>退款</span>
						</div>
					</div>
				</div>
				<div className="hr"></div>
				<Link to={`/bindPhone`}>
				<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
					<div className="flex-box">
						<img className="icon-1" src={require('assets/img/phone.png')} alt="" />
						<span>绑定手机</span>
					</div>
					<span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

				</div>
				</Link>
				<Link to={`/collect`}>
					<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff bd-top">
						<div className="flex-box">
							<img className="icon-1" src={require('assets/img/collect.png')} alt="" />
							<span>我的收藏</span>
						</div>
						<span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

					</div>
				</Link>
				<div className="hr"></div>
				<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
					<div className="flex-box">
						<img className="icon-1" src={require('assets/img/help.png')} alt="" />
						<span>购物帮助</span>
					</div>
					<span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

				</div>
				<Link to={`/feedback`}>
					<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff bd-top">
						<div className="flex-box">
							<img className="icon-1" src={require('assets/img/feedback.png')} alt="" />
							<span>意见反馈</span>
						</div>
						<span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

					</div>
				</Link>
			</div>

		)
	}
}
export default Personal
