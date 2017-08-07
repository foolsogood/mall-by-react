import React,{Component} from 'react'
import HotItem from './hotItem'
export default class HotList extends Component{
   constructor(){
       super()
       this.state={
           arr:[]
       }
   };
    componentWillMount(){
        let arr1=[]
        for(let i in this.props.hotGoods){
            arr1.push(this.props.hotGoods[i])
        }
        this.setState({
            arr:arr1
        })
    };
    render(){
        return (
            <div className="bg-fff home-good">
                <div className="home-good-title">热销商品</div>
                <div >
                    {
                        this.state.arr.map((item,idx)=>{
                            return(
                                <HotItem key={idx} good={item}/>
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}