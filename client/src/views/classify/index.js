import React, { Component } from 'react'
//公共组件
import TitleBar from 'components/common-components/titleBar.js'
import Footer from 'components/common-components/footer.js'
import ClassifyList from 'components/classify-components/classifyList'

import ClassifyTitle from 'components/classify-components/classifyTitle'


export default class cateify extends Component {
	constructor() {
		super()
		this.state = {

			ifBackShow: false,
			titleArr: [],
			list: []
		}
	};
	componentWillMount() {
		this._getCates()
	};
	_getCates() {
		const url = $api.category.getCates
		$apiServer.get(url)
			.then($preAjaxHandler.call(this))
			.then(res => {
				let arr = res.data.map(item => {
					return this._getGoodsList(item.cateId)
				})
				Promise.all(arr).then(rep => {
					// console.log(rep)
					this.setState({
						list: rep
					})
				})
			}).catch($commonErrorHandler.apply(this, [url]))

	};
	_getGoodsList(cateId) {
		return $apiServer.get($api.good.getGoodsByCate, { query: { cateId } }).then(res => {
			return res.data
		})
	}
	render() {
		return (
			<div className="classify">
				<TitleBar ifBackShow={this.state.ifBackShow} titleText="分类" />
				<div style={{ position: 'fixed', top: '0.8rem', left: '0', right: '0', zIndex: '99' }}><ClassifyTitle titleArr={this.state.list} /></div>
				<div style={{
					position: 'relative',
					top: '.8rem'
				}}>
					{
						this.state.list.map((item, idx) => {
							return (
								<ClassifyList key={item[0].cateId}
									list={item}
									cateId={item[0].cateId}
								/>
							)
						})
					}


				</div>
				<Footer />
			</div>
		)
	}
}