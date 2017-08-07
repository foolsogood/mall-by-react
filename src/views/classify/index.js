
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
		let arr2 = []

		for (let i in goodList) {
			let objItem = {}
			objItem.text = goodList[i].cate
			objItem.cateId = i
			arr.push(objItem)
		}
		this.setState({
			titleArr: arr
		})
		for (let j in goodList) {
			let list = goodList[j].list
			arr2.push(list)
		}
		this.setState({
			list: arr2
		})
		// console.log(arr2)
	};
	render() {
		return (
			<div className="classify">
				<TitleBar  ifBackShow={this.state.ifBackShow} titleText="分类" />
				<div style={{ position: 'fixed', top: '0.8rem', left: '0', right: '0', zIndex: '99' }}><ClassifyTitle titleArr={this.state.titleArr} /></div>
				<div style={{
					position: 'relative',
					top: '.8rem'
				}}>
					{
						this.state.list.map((item, idx) => {
							return (
								<ClassifyList key={idx} list={item} cateId={item[Object.keys(item)[0]].cateId} titleArr={this.state.titleArr}/>
							)
						})
					}


				</div>
				<Footer />
			</div>
		)
	}
}