import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import {connect} from 'dva';
@connect(({app})=>({app}))
class SmallLoading extends Component {
    render() {
        const { isLoadingShow, loadingTxt } = this.props.app.loading
        const style = {
            position: 'fixed',
            left: '50%',
            top: '50%',
            margin: '-1rem 0 0 -1rem',
            zIndex: 999,
            width: '2rem',
            height: '2rem',
            background: 'rgba(0,0,0,.5)',
            borderRadius: '5%',
        }
        const isShow = { opacity: isLoadingShow ? 1 : 0 }

        return (
            <div className="flex-box flex-ver-box" style={{ ...style, ...isShow }}>
                <Icon type="loading" style={{ fontSize: '.4rem', color: '#444' }} />
                <span className="color-fff" style={{ lineHeight: '.7rem' }}>{loadingTxt}</span>
            </div>
        )
    }
}
SmallLoading.propTypes={
    dispatch:PropTypes.func,
    app:PropTypes.object
}
export default (SmallLoading)