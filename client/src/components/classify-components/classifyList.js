import React, { Component } from 'react'

import { Link } from 'react-router-dom'
export default class classifyList extends Component {
   
    render() {
        const { list,cateId } = this.props
        const anchor=`#anchor-${cateId}`
        return (
            <div id={anchor}  >
                <div className="bg-fff pd-h-20">
                    <div className="flex-box h-80 bg-fff title">
                         {list[0].cate} 
                    </div>
                    {
                        list.map((item) => {
                            return (
                                <div key={item.goodId} className="classify-block ">
                                    <Link to={`/goodDetail/${item.goodId}`}>
                                        <div className="flex-box flex-ver-box">
                                             <img className="classify-good-img" src={JSON.parse(item.imgs)[0]} alt="" /> 
                                            <p>{item.goodName}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })

                    }
                </div>
                <div className="hr"></div>
            </div>
        )
    }
}