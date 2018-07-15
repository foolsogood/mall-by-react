import React, { Component } from 'react'
export default class Loading extends Component {
    render() {
        const style={
            position:'fixed',
            left:0,
            top:0,
            right:0,
            bottom:0,
            zIndex:999,
            background:'rgba(255,255,255,.5)'
        }
        return (
            <div className="flex-box " style={style}>loading……</div>
        )
    }
}