import React, { Component } from 'react'
interface Props{
    src?:string,
    'data-errorimgsrc':string,
    [propName:string]:string
}
interface State{
    imgSrc:string,
}
export default class ImgWrapper extends Component<Props,State> {
    /**
     * 该组件作用：图片onerror 替换成默认图片
     */
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: ''
        }
    }
    imgErrorHandler=()=> {
        this.setState({
            imgSrc: this.props['data-errorimgsrc']
        })
    }
    componentDidMount() {
        this.setState({
            imgSrc: this.props.src ? this.props.src : ''
        })
    }
    render() {
        const props = this.props
        const { imgSrc } = this.state
        return (
            <img {...props} onError={this.imgErrorHandler} src={imgSrc} alt="" />
        )
    }
}