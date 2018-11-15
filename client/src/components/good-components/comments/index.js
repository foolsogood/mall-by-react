import React, { Component } from 'react'
import CommentItem from './commentItem'
export default class Comments extends Component {
    render() {
        const {rateList}=this.props
        const haveComment=()=>(
            rateList.map((item, idx) => {
                return (
                    <CommentItem key={idx} rate={item}/>
                )
            })
        )
        const haveNoComment=()=>(
            <p className="flex-box">暂无评论</p>
        )
        return (
            <div>
                {
                    rateList.length?haveComment():haveNoComment()
                }


            </div>
        )
    }
}