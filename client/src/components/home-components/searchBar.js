import React, { Component } from 'react'
import { Input } from 'antd'
import { Link } from 'react-router-dom'

import xhr from 'service/xhr'
import api from 'service/api'
const Search = Input.Search
export default class searchBar extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            keyword: ''
        }
        this._serachGood = this._serachGood.bind(this)
        this._keywordChange = this._keywordChange.bind(this)

    }
    inputStyle = {
        width: '90%'

    };
    _serachGood(keyword) {
        xhr.get(api.good.searchGood, { query: { keyword } }).then(res => {
            if (res.code === '1') {
                this.setState({
                    list: res.data
                })
            }
        })
    }
    _keywordChange(ev) {
        console.log(ev)
        // if(!keyword){
        //     this.setState({
        //         list: []
        //     })
        // }
    }
    render() {
        // const {keyword}=this.state
        return (
            <div className="flex-box flex-ver-box search-bar">
                <Search placeholder="搜索商品" onSearch={keyword => this._serachGood(keyword)} style={this.inputStyle} />
                <div className="bg-fff" style={this.inputStyle}>
                    {
                        this.state.list.map((item, idx) => {
                            return (
                                <Link key={idx} to={`/goodDetail/${item.cateId}/${item.goodId}`}>

                                    <div className="pd-h-20" style={{ lineHeight: '0.8rem' }}>
                                        <p>{item.goodName}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}