import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ImgWrapper extends PureComponent {
    /**
     * 该组件作用：图片onerror 替换成默认图片
     */
    static propTypes = {
        'data-errorimgsrc': PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
    };
    constructor() {
        super()
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