import React, { Component } from 'react'
import RecomItem from './recomItem'
import PropTypes from 'prop-types'
import xhr from 'service/xhr'
import api from 'service/api'

export default class RecomList extends Component {
    constructor() {
        super()
        this.state = {
            obj: []
        }
    };
    static propTypes = {
        titleText: PropTypes.string
    };
    componentWillMount() {
        this._getRecomGoods()
    };
    _getRecomGoods() {
        xhr.get(api.good.getNewGoods,{}).then(res => {
            if (res.code === '1') {
                this.setState({
                    obj: res.data
                })
            }
        }).catch(err => { })
    };
    render() {
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">{this.props.titleText}</div>
                <div>
                    {
                        this.state.obj.map((item) => {
                            return (
                                <RecomItem key={item.goodId} good={item} />
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}