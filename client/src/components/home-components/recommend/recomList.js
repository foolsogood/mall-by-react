import React, { Component } from 'react'
import RecomItem from './recomItem'
import PropTypes from 'prop-types'



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
        const url = $api.good.getNewGoods
        $apiServer.get(url)
            .then($preAjaxHandler.call(this))
            .then(res => {
                this.setState({
                    obj: res.data
                })
            }).catch($commonErrorHandler.apply(this, [url]))

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