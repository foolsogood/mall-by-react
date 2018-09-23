import React, { Component } from 'react'

export default class ImgWrapper extends Component {
   /**
    * 该组件作用：图片onerror 替换成默认图片
    */
    constructor() {
        super()
        this.state = {
            imgSrc:''
        }
        this.imgErrorHandler = this.imgErrorHandler.bind(this)
    }
    imgErrorHandler(){
        this.setState({
            imgSrc:require('assets/img/default.jpg')
        })
    }
    componentWillMount(){
        this.setState({
            imgSrc:this.props.src?this.props.src:''
        })
    }
    render() {
        const props=this.props
        const { imgSrc } = this.state
        return (
                <img {...props} onError={this.imgErrorHandler} src={imgSrc}  alt="" />
        )
    }
}