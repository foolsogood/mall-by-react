import React, { Component } from 'react'
import Footer from './footer'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
/**
 * 该组件用于返回具有底部导航栏的页面
 */
type Constructor<T> = new(...args: any[])=> T 

export default  (WrapedComponent:Constructor<any>):Constructor<any> => {
    return class WithFooter extends Component {
        static displayName=`WithFooterHOC(${getDisplayName(WrapedComponent)})`
        render() {
            return (
                <>
                    <WrapedComponent {...this.props}/>
                    <Footer {...this.props}/>
                </>
            )
        }

    }
}