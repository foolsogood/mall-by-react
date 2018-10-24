import React, { PureComponent } from 'react'
import CommentItem from './commentItem'
export default class Comments extends PureComponent {
    render() {
        return (
            <div>
                {
                    this.props.rateList.map((item, idx) => {
                        return (
                            <CommentItem key={idx} rate={item}/>
                        )
                    })
                }


            </div>
        )
    }
}