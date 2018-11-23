import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//组件
import WithHeader from 'components/common-components/withHeader'

@WithHeader({
    titleText:'评论'})

 class Comment extends Component {
	render() {
		
		return (
			<div>
                评论
            </div>

		)
	}
}
export default Comment
