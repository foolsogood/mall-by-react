import React, { PureComponent } from 'react'
import Footer from './footer'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
/**
 * 该组件用于返回具有底部导航栏的页面
 */
export default  (WrapedPureComponent) => {
    return class WithFooter extends PureComponent {
        static displayName=`WithHeaderHOC(${getDisplayName(WrapedPureComponent)})`
        render() {
            return (
                <div>

                    <WrapedPureComponent {...this.props}/>
                    <Footer/>
                </div>
            )
        }

    }
}