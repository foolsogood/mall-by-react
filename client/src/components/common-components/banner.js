import React from 'react'
import { Carousel } from 'antd'
/**
 * 没有使用state或生命周期的情况下写成无状态组件性能更好
 */
const imgStyle = {
    width: '100%',
    height: '4rem'
};
function Banner({ imgList }) {
    return (
        <div>
            <Carousel effect="fade" autoplay>
                {
                    imgList.map((item, index) => {
                        return (
                            <div key={index}>
                                <img style={imgStyle} src={item.url ? item.url : item} alt="" />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
export default Banner
