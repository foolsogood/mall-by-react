import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImgWraper from 'components/common/imgWraper'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable';
import Loading from 'components/common/loading'

export default class RecomItem extends Component {
    static propTypes={
        good:PropTypes.object.isRequired
    };
    render() {
        const {good}=this.props
         /**
         * 鼠标移动到商品时 预加载商品详情页
         */
        const LoadableComponent = Loadable({
            loader: () => import('views/goodDetail'),
            loading: Loading,
          });
        return (
            <div className="home-good-item" onTouchStart={()=>{
                LoadableComponent.preload()
            }}>
               <Link to={`/goodDetail/${good.goodId}`}>
                <div className="flex-box flex-ver-box ">
                <ImgWraper className="good-item-img" data-errorimgsrc={require('assets/img/default-good.jpg')} src={good.imgs[0]}/>
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