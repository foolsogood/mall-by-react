import React, { Component } from 'react'

import { Link } from 'react-router-dom'
export default class classifyList extends Component {
   
    render() {
        const { list,cateId } = this.props
        const anchor=`anchor-${cateId}`
        return (
            <div id={anchor}  >
                <div className="bg-fff pd-h-20">
                    <div className="flex-box h-80 bg-fff title">
                         {list.cate} 
                    </div>
                    {
                        Object.keys(list.list).map((item) => {
                            return (
                                <div key={item} className="classify-block ">
                                    <Link to={`/goodDetail/${list.list[item].cateId}/${list.list[item].id}`}>
                                        <div className="flex-box flex-ver-box">
                                             <img className="classify-good-img" src={list.list[item].imgList[0]} alt="" /> 
                                            <p>{list.list[item].name}</p>
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