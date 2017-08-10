import React, { Component } from 'react'
import RecomItem from './recomItem'
// 引入mock数据
import { mockData } from '../../../mockData'
export default class RecomList extends Component {
    constructor() {
        super()
        this.state = {
            obj: {}
        }
    };
    componentWillMount() {
        this._getRecomGoods()
    };
    _getRecomGoods(){
        let recomendGoods=mockData.recomendGoods
        this.setState({
            obj: recomendGoods
        })
	};
    render() {
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">{this.props.titleText}</div>
                <div>
                    {
                        Object.keys(this.state.obj).map((item) => {
                            return (
                                <RecomItem key={item} good={this.state.obj[item]} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}