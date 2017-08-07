import React, { Component } from 'react'
import { Row, Col } from 'antd'
import {Link} from 'react-router-dom'
//图标
import avatar from '../../static/img/avatar.jpg'
import bg from '../../static/img/people_bg.png'
import iconPay from '../../static/img/ic-paying.png'
import iconDeliver from '../../static/img/ic-delivering.png'
import iconEval from '../../static/img/ic-evaluate.png'
import iconRefu from '../../static/img/ic-refund.png'
import iconRece from '../../static/img/ic-receipting.png'
import phone from '../../static/img/phone.png'
import help from '../../static/img/help.png'
import feedback from '../../static/img/feedback.png'
import iconNext from '../../static/img/ic-next2.png'
//组件
import Footer from '../../components/common-components/footer.js'
import TitleBar from '../../components/common-components/titleBar.js'

export default class Personal extends Component {
	constructor() {
		super()
		this.state = {
			
			ifBackShow: false
		}
	};
	componentWillMount() {
	
	};
	render() {
		return (
			<div className="personal">
				<TitleBar  ifBackShow={this.state.ifBackShow} titleText="个人页" />
				<div className="personal-header">
					<img className="bg" src={bg} alt=""/>
					<div className="info ">
						<Row className="flex-box">
							<Col span={6} className="flex-box">
								<img className="avatar " src={avatar} alt="" />
							</Col>
							<Col span={18}><span>tycho</span></Col>
						</Row>
					</div>
				</div>
				<div className="hr"></div>
				<div>
					<div className="flex-box flex-ju-c-bt h-80 bg-fff pd-h-20">
						<span>我的订单</span>
						<div className="flex-box">
							<span>全部订单</span>
							<img className="icon-2" src={iconNext} alt=""/>
						</div>
					</div>
					<div className="flex-box bg-fff pd-v-20 bd-top">
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={iconPay} alt="" />
							<span>待付款</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={iconDeliver} alt="" />
							<span>待发货</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={iconEval} alt="" />
							<span>待收货</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={iconRefu} alt="" />
							<span>待评价</span>
						</div>
						<div className="flex-box flex-ver-box flex-1">
							<img className="icon" src={iconRece} alt="" />
							<span>退款</span>
						</div>
					</div>
				</div>
				<div className="hr"></div>
				<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
					<div className="flex-box">
						<img className="icon-1" src={phone} alt="" />
						<span>绑定手机</span>
					</div>
					<img className="icon-2" src={iconNext} alt=""/>
				</div>
				<div className="hr"></div>
				<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
					<div className="flex-box">
						<img className="icon-1" src={help} alt="" />
						<span>购物帮助</span>
					</div>
					<img className="icon-2" src={iconNext} alt=""/>
				</div>
				<Link to={`/feedback`}>
				<div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff bd-top">
					<div className="flex-box">
						<img className="icon-1" src={feedback} alt="" />
						<span>意见反馈</span>
					</div>
					<img className="icon-2" src={iconNext} alt=""/>
				</div>
				</Link>
				<Footer />
			</div>

		)
	}
}
