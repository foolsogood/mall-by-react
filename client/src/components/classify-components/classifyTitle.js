import React, { PureComponent } from 'react'

export default class classifyTitle extends PureComponent {
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
                                    <a href={`#anchor-`+item[0].cateId}>{item[0].cate}</a>
                                </li>
                            )
                        })
                    }
                    </ul>
               

            </div>
        )
    }
}