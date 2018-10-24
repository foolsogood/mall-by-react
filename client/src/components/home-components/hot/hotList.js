import React,{PureComponent} from 'react'
import HotItem from './hotItem'
import PropTypes from 'prop-types'
export default class HotList extends PureComponent{
  static propTypes={
      hotGoods:PropTypes.array.isRequired
  };
    render(){
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">热销商品</div>
                <div >
                    {
                        this.props.hotGoods.map((item)=>{
                            return(
                                <HotItem key={item.goodId} good={item}/>
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}