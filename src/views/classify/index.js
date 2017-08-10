import React, { Component } from 'react'
//公共组件
import TitleBar from '../../components/common-components/titleBar.js'
import Footer from '../../components/common-components/footer.js'
import ClassifyList from '../../components/classify-components/classifyList'

import ClassifyTitle from '../../components/classify-components/classifyTitle'
// mockData
import { mockData } from '../../mockData'
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
		this._getGoodsList()
	};
	_getGoodsList() {
		let goodList = mockData.goodList
		let arr = []

		// console.log('goodList', goodList)
		for (let i in goodList) {
			let objItem = {}
			objItem.text = goodList[i].cate
			objItem.cateId = i
			arr.push(objItem)
		}
		this.setState({
			titleArr: arr,
			list: goodList
		})
		
	};
	render() {
		return (
			<div className="classify">
				<TitleBar ifBackShow={this.state.ifBackShow} titleText="分类" />
				<div style={{ position: 'fixed', top: '0.8rem', left: '0', right: '0', zIndex: '99' }}><ClassifyTitle titleArr={this.state.titleArr} /></div>
				<div style={{
					position: 'relative',
					top: '.8rem'
				}}>
					{
						Object.keys(this.state.list).map((item) => {
							return (
								<ClassifyList key={item}
									list={this.state.list[item]}
									cateId={this.state.list[item].list[Object.keys(this.state.list[item].list)[0]].cateId}
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