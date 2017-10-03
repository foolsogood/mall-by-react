import React, { Component } from 'react'
import RecomItem from './recomItem'
import PropTypes from 'prop-types'
import xhr from '../../../service/xhr'
export default class RecomList extends Component {
    constructor() {
        super()
        this.state = {
            obj: {}
        }
    };
    static propTypes = {
        titleText: PropTypes.string
    };
    componentWillMount() {
        this._getRecomGoods()
    };
    _getRecomGoods() {
        xhr.get('/api/getRecomendGoods',{}).then(res => {
            if (res.code === 1) {
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