import React, { Component } from 'react'
import RecomItem from './recomItem'
// 引入mock数据
import { mockData } from '../../../mockData'
export default class RecomList extends Component {
    constructor() {
        super()
        this.state = {
            arr: []
        }
    };
    componentWillMount() {
        this._getRecomGoods()
        
    };
    _getRecomGoods(){
        let recomendGoods=mockData.recomendGoods
        //将集合转数组
        let arr1 = []
        for (let i in recomendGoods) {
            arr1.push(recomendGoods[i])
        }
        this.setState({
            arr: arr1
        })
	};
    render() {
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">{this.props.titleText}</div>
                <div>
                    {
                        this.state.arr.map((item, idx) => {
                            return (
                                <RecomItem key={idx} good={item} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}