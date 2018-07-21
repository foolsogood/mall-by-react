import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
export default class RecomItem extends Component {
    static propTypes={
        good:PropTypes.object.isRequired
    };
    render() {
        const good=this.props.good
        return (
            <div className="home-good-item">
               <Link to={`/goodDetail/${good.goodId}`}>
                <div className="flex-box flex-ver-box ">
                    <img className="good-item-img" src={JSON.parse(good.imgs)} alt="" />
                    <div className="flex-box flex-ver-box flex-al-st good-item-text">
                        <p className="good-itm-p-1  ">{good.goodName}</p>
                        <p className="good-itm-p-2">{good.desction}</p>
                        <p className="price">¥{good.price}</p>
                    </div>
                </div>
               </Link>
            </div>
        )
    }
}