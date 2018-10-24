import React, { PureComponent } from 'react'
import TitleBar from './titleBar'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
/**
 * 该组件用于返回具有导航栏的页面
 */
export default (titleProp)=> (WrapedPureComponent) => {
    return class WithHeader extends PureComponent {

        static displayName=`WithHeaderHOC(${getDisplayName(WrapedPureComponent)})`

        render() {
            return (
                <div>
                    <TitleBar {...titleProp}/>

                    <WrapedPureComponent {...this.props}/>
                </div>
            )
        }

    }
}