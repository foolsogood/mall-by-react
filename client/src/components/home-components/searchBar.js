import React, { Component } from 'react'
import { Input } from 'antd'
import { Link } from 'react-router-dom'



const Search = Input.Search
export default class searchBar extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            keyword: '',
            isSerachHasData:null,//搜索是否有对应商品
        }
        this._serachGood = this._serachGood.bind(this)
        this._keywordChange = this._keywordChange.bind(this)

    }
    inputStyle = {
        width: '90%'

    };
    _serachGood(keyword) {
        const url = $api.good.searchGood
        $apiServer.get(url, { query: { keyword } })
            .then($preAjaxHandler.call(this))
            .then(res => {
                this.setState({
                    list: res.data,
                    isSerachHasData:Boolean(res.data&&res.data.length)
                })
            }).catch($commonErrorHandler.apply(this, [url]))

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
        const { list,isSerachHasData } = this.state
        const hasData = (() => {
            return list.map((item, idx) => {
                return (
                    <Link key={item.goodId} to={`/goodDetail/${item.goodId}`}>

                        <div className="pd-h-20 flex-box just-c-st" style={{ width: '100%', lineHeight: '0.8rem' }}>
                            <img src={item.imgs && JSON.parse(item.imgs)[0]} style={{ width: '.5rem', height: '.5rem' }} />
                            <span style={{ paddingRight: '.2rem' }}>{item.goodName}</span>
                        </div>
                    </Link>
                )
            })
        })
        const emptyData = (() => {
            return (
                <div className="flex-box">没有数据</div>
            )
        })
        return (
            <div className="flex-box flex-ver-box search-bar " style={{ padding: '.1rem 0' }}>
                <Search placeholder="搜索商品" onSearch={keyword => this._serachGood(keyword)} style={this.inputStyle} />
                <div className="bg-fff" style={this.inputStyle}>

                    {
                        isSerachHasData ? hasData() :(isSerachHasData===false?emptyData():null)
                    }
                </div>
            </div>
        )
    }
}