import React, { Component } from 'react'
import Footer from './footer'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
/**
 * 该组件用于返回具有底部导航栏的页面
 */
export default  (WrapedComponent) => {
    return class WithFooter extends Component {
        static displayName=`WithHeaderHOC(${getDisplayName(WrapedComponent)})`
        render() {
            return (
                <div>

                    <WrapedComponent {...this.props}/>
                    <Footer/>
                </div>
            )
        }

    }
}