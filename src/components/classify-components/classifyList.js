import React, { Component } from 'react'

import { Link } from 'react-router-dom'
export default class classifyList extends Component {
    _getTitle() {
        const { titleArr, cateId } = this.props
        for (let i in titleArr) {
            if (cateId === titleArr[i].cateId) {
                return titleArr[i].text
            }
        }
    };
    render() {
        const { list,cateId } = this.props
        const anchor=`anchor-${cateId}`
        return (
            <div id={anchor}  >
                <div className="bg-fff pd-h-20">
                    <div className="flex-box h-80 bg-fff title">
                        {this._getTitle()}
                    </div>
                    {
                        Object.keys(list).map((item, idx) => {
                            return (
                                <div key={idx} className="classify-block ">
                                    <Link to={`/goodDetail/${list[item].cateId}/${list[item].id}`}>
                                        <div className="flex-box flex-ver-box">
                                            <img className="classify-good-img" src={list[item].imgList[0]} alt="" />
                                            <p>{list[item].name}</p>
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