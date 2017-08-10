import React,{Component} from 'react'
import HotItem from './hotItem'
import PropTypes from 'prop-types'
export default class HotList extends Component{
  static propTypes={
      hotGoods:PropTypes.object.isRequired
  };
    render(){
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">热销商品</div>
                <div >
                    {
                        Object.keys(this.props.hotGoods).map((item)=>{
                            return(
                                <HotItem key={item} good={this.props.hotGoods[item]}/>
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}