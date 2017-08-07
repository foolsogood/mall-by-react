import React, { Component } from 'react'

export default class classifyTitle extends Component {
    _goAchor(cateId,e){
       console.log(`点击了${cateId}`)
    };
    render() {
        return (
            <div className="classify-title">
               
                    <ul>
                        {
                        this.props.titleArr.map((item,idx)=>{
                            return(
                                <li key={idx} >
                                    <a href={`#anchor-`+item.cateId}>{item.text}</a>
                                </li>
                            )
                        })
                    }
                    </ul>
               

            </div>
        )
    }
}