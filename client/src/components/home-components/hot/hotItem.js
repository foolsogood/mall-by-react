
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImgWraper from 'components/common-components/imgWraper.js'

import PropTypes from 'prop-types'
export default class HotItem extends Component {
    static propTypes = {
        good: PropTypes.object.isRequired
    };
    render() {
        const {good} = this.props
        return (
            <div className="home-good-item">
                <Link to={`/goodDetail/${good.goodId}`}>
                    <div className="flex-box flex-ver-box ">
                    <ImgWraper className="good-item-img"  src={JSON.parse(good.imgs)[0]}/>
                        <div className="flex-box flex-ver-box flex-al-st good-item-text">

                            <p className="good-itm-p-1  ">{good.goodName}</p>
                            <p className="good-itm-p-2 ">{good.desction}</p>
                            <p className="price">¥{good.price}</p>
                        </div>

                    </div>
                </Link>
            </div>
        )
    }
}