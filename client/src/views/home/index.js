import React, { Component } from 'react'
//公共组件
import Footer from 'components/common-components/footer.js'
// 首页组件
import SearchBar from 'components/home-components/searchBar'
import Banner from 'components/common-components/banner'
import Notice from 'components/home-components/notice'
import HostList from 'components/home-components/hot/hotList'
import RecomList from 'components/home-components/recommend/recomList'
import tool from 'utils/tool'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			imgList: [''],
			hotGoods: [],
			searchStyle: {}
		}
		//虽然在componentWillUnmount中清除事件监听,但setState没有立刻停止，该变量可用于做每次setState的前提条件
		this.lock = false
	};
	styleObj1 = {
		position: 'relative',
		top: '-.8rem'
	};
	componentWillMount() {
		this._getHomeImgList()
		this._getHotGoods()
	};
	componentDidMount() {
		window.addEventListener('scroll', (e) => {
			this._changeSearchStyle(e)
		})
	};

	componentWillUnmount() {
		this.lock = true
		window.removeEventListener('scroll', (e) => {
			this._changeSearchStyle(e)
		})
	};
	_getHomeImgList() {
		const url = $api.banner.getHomeBanner
		$apiServer.get(url)
			.then($preAjaxHandler.call(this))
			.then(res => {
				this.setState({
					imgList: res.data
				})
			}).catch($commonErrorHandler.apply(this, [url]))
	};
	_changeSearchStyle(e) {

		let fn = () => {
			if (!this.lock) {
				let scroTop = document.documentElement.scrollTop
				if (scroTop > 20) {
					this.setState({
						searchStyle: {
							background: 'rgba(72,173,252,' + 1 * scroTop / 200 + ')',
							lineHeight: '1rem'
						}
					})

				} else {
					const _c = {
						top: '0',
						background: 'transparent'
					}
					if (tool.checkIfEual(this.state.searchStyle, _c)) {
						console.log('equal')
						return
					}
					this.setState({
						searchStyle: _c
					})
				}
			}

		}
		//节流
		tool.throttle(fn, 50)()

	};
	_getHotGoods() {
		const url = $api.good.getHotGoods
		$apiServer.get(url)
			.then($preAjaxHandler.call(this))
			.then(res => {
				this.setState({
					hotGoods: res.data
				})
			}).catch($commonErrorHandler.apply(this, [url]))
	};
	render() {
		return (
			<div style={this.styleObj1} id="home" ref="home">
				<div className="home-search-container" style={this.state.searchStyle}>
					<SearchBar />
				</div>
				< Banner imgList={this.state.imgList} />
				<Notice />
				<div className="content">
					<HostList hotGoods={this.state.hotGoods} />
					<div className="hr"></div>
					<RecomList titleText="最新商品" />
				</div>
				<Footer />
			</div>

		)
	}
}

