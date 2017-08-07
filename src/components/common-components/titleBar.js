import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { createHistory } from 'history'
const history = createHistory()
export default class titleBar extends Component {
	constructor() {
		super()
		this.state = {
			backText: '<'
		}
	};
	goBack() {
		history.goBack()
	};
	render() {
		const titleText = this.props.titleText
		return (
			<div>

				<div className="title-bar h-80 t-tc color-fff">
					<Row>
						<Col span={2}>
							{this.props.ifBackShow
								? <span onClick={this.goBack}>{this.state.backText}</span>
								: ''
							}
						</Col>
						<Col span={20}>{titleText}</Col>
						<Col span={2}></Col>
					</Row>
				</div>

			</div>
		)
	}
}