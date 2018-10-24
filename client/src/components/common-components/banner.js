import React from 'react'
import { Carousel } from 'antd'

export default class Banner extends React.Component {
    
    imgStyle = {
        width: '100%',
        height: '4rem'
    };
   
    componentDidMount() {
        //  console.log('>>>', this.props.imgList)
    };
    render() {
        return (
            <div>
                  <Carousel effect="fade" autoplay>
                    {
                        this.props.imgList.map((item, index) => {
                            return (
                               <div key={index}>
                                    <img  style={this.imgStyle} src={item.url?item.url:item} alt="" />
                               </div>
                            )
                        })
                    }
                </Carousel>  
            </div>
        )
    }
}