import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class RecomItem extends Component {
    render() {
        const good=this.props.good
        return (
            <div className="home-good-item">
               <Link to={`/goodDetail/${good.cateId}/${good.id}`}>
                <div className="flex-box flex-ver-box ">
                    <img className="good-item-img" src={good.img} alt="" />
                    <div className="flex-box flex-ver-box flex-al-st good-item-text">
                        <p className="good-itm-p-1  ">{good.name}</p>
                        <p className="good-itm-p-2">{good.desc}</p>
                        <p className="price">¥{good.price}</p>
                    </div>
                </div>
               </Link>
            </div>
        )
    }
}