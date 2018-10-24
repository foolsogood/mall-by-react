import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
export default class footer extends PureComponent {
	constructor() {
		super()
		this.state = {
			pathname: ''
		}
	};
	_getPathname() {
		return window.location.pathname
	};
	

	render() {
		const iconStyle={fontSize:'.4rem'}
		const active={color: '#1296db'}
		const common={color:'#8a8a8a'}
		return (
			<footer className="footer t-tc" >
				<Row>
					<Col span={6} >
						<Link to={`/`} className="flex-box flex-ver-box" style={{cursor:'pointer'}}>

							{
								this._getPathname() === `/`
									? <div className="flex-box flex-ver-box">
									<span className="iconfont icon-weibiaoti1" style={{...iconStyle,...active}}></span>
										<span style={active}>主页</span>
									</div>
									:<div className="flex-box flex-ver-box">
									<span className="iconfont icon-weibiaoti1" style={{...iconStyle,...common}}></span>
										<span style={common}>主页</span>
									</div>
									
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/classify`} className="flex-box flex-ver-box" style={{cursor:'pointer'}}>
							{
								this._getPathname() === `/classify`
									? <div className="flex-box flex-ver-box">
									<span className="iconfont icon-fenleitianchong" style={{...iconStyle,...active}}></span>
										<span style={active}>分类</span>
									</div>
									:<div className="flex-box flex-ver-box">
									<span className="iconfont icon-fenleitianchong" style={{...iconStyle,...common}}></span>
										<span style={common}>分类</span>
									</div>
									
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/shopCart`} className="flex-box flex-ver-box"  style={{cursor:'pointer'}}>

							{
								this._getPathname() === `/shopCart`
									? <div className="flex-box flex-ver-box">
									<span className="iconfont icon-gouwuche" style={{...iconStyle,...active}}></span>
										<span style={active}>购物车</span>
									</div>
									:
									<div className="flex-box flex-ver-box">
									<span className="iconfont icon-gouwuche" style={{...iconStyle,...common}}></span>
										<span style={common}>购物车</span>
									</div>
							}
						</Link>
					</Col>
					<Col span={6}>
						<Link to={`/personal`} className="flex-box flex-ver-box" style={{cursor:'pointer'}}>
							{
								this._getPathname() === `/personal`
									? <div className="flex-box flex-ver-box">
									<span className="iconfont icon-yonghu" style={{...iconStyle,...active}}></span>
										<span style={active}>我的</span>
									</div>
									:
									<div className="flex-box flex-ver-box">
									<span className="iconfont icon-yonghu" style={{...iconStyle,...common}}></span>
										<span style={common}>我的</span>
									</div>
							}

						</Link>
					</Col>
				</Row>
			</footer>
		)
	}
}