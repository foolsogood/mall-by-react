import React,{Component} from 'react'
import {Input} from 'antd'
const Search=Input.Search
export default class searchBar extends Component{
    inputStyle={
        width:'90%'
       
    };
    render(){
        return(
            <div className="flex-box">
                <Search placeholder="搜索商品" style={this.inputStyle}/>
            </div>
        )
    }
}