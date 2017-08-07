import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
//引入图片
import home0 from '../../static/img/home-0.png'
import home1 from '../../static/img/home-1.png'
import classify0 from '../../static/img/classify-0.png'
import classify1 from '../../static/img/classify-1.png'
import cart0 from '../../static/img/cart-0.png'
import cart1 from '../../static/img/cart-1.png'
import my0 from '../../static/img/my-0.png'
import my1 from '../../static/img/my-1.png'

export default class footer extends Component {
	constructor() {
		super()
		this.state = {
			pathname: ''
		}
	};
	_getPathname() {
		return window.location.pathname
	};
	active = {
		color: '#1296db'
	};

	render() {
		return (
			<footer className="footer t-tc">
				<Row>
					<Col span={6} >
						<Link to={`/`} className="flex-box flex-ver-box" >

							{
								this._getPathname() === `/`
									? <div className="flex-box flex-ver-box">
										<img className="icon" src={home1} alt="" />
										<span style={this.active}>主页</span>
									</div>
									:<div className="flex-box flex-ver-box">
										<img className="icon" src={home0} alt="" />
										<span >主页</span>
									</div>
									
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/classify`} className="flex-box flex-ver-box"  >
							{
								this._getPathname() === `/classify`
									? <div className="flex-box flex-ver-box">
										<img className="icon" src={classify1} alt="" />
										<span style={this.active}>分类</span>
									</div>
									:<div className="flex-box flex-ver-box">
										<img className="icon" src={classify0} alt="" />
										<span >分类</span>
									</div>
									
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/shopCart`} className="flex-box flex-ver-box"  >

							{
								this._getPathname() === `/shopCart`
									? <div className="flex-box flex-ver-box">
										<img className="icon" src={cart1} alt="" />
										<span style={this.active}>购物车</span>
									</div>
									:
									<div className="flex-box flex-ver-box">
										<img className="icon" src={cart0} alt="" />
										<span >购物车</span>
									</div>
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/personal`}   >
							{
								this._getPathname() === `/personal`
									? <div className="flex-box flex-ver-box">
										<img className="icon" src={my1} alt="" />
										<span style={this.active}>我的</span>
									</div>
									:
									<div className="flex-box flex-ver-box">
										<img className="icon" src={my0} alt="" />
										<span >我的</span>
									</div>
							}

						</Link>
					</Col>
				</Row>
			</footer>
		)
	}
}