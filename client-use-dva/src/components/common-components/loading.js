import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
export default class Loading extends Component {
    render() {
        const divStyle = {
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            // background: 'rgba(255,255,255,.5)',
            opacity:0
        }
        const iconstyle={fontSize:'.4rem',color:'#444'}
        return (
            <div className="flex-box flex-ver-box" style={divStyle}>
                <Icon type="loading" style={iconstyle}/>
                <span>loading…… </span>
            </div>
        )
    }
}