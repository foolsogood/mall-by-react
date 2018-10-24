import React, { Component } from 'react'
import TitleBar from './titleBar'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
/**
 * 该组件用于返回具有导航栏的页面
 */
export default (titleProp)=> (WrapedComponent) => {
    return class WithHeader extends Component {

        static displayName=`WithHeaderHOC(${getDisplayName(WrapedComponent)})`

        render() {
            return (
                <div>
                    <TitleBar {...titleProp}/>

                    <WrapedComponent {...this.props}/>
                </div>
            )
        }

    }
}