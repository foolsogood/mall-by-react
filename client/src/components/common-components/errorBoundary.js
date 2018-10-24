import React, { PureComponent } from 'react'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
const ErrorBoundary = WrapedPureComponent => {
    return class ErrorBoundaryHOC extends PureComponent {
        constructor(props) {
            super(props)
            this.state = {
                hasError: false
            }
        }
        static displayName=`ErrorBoundaryHOC(${getDisplayName(WrapedPureComponent)})`
        componentDidCatch(err, info) {
            console.error(err)
            this.setState({
                hasError: true
            })
            throw err
        }
        render() {
            if (this.state.hasError) {
                return (
                    <div className="page">
                        something is wrong
                    </div>
                )
            }
            return <WrapedPureComponent {...this.props}/>
        }
    }
}
export default ErrorBoundary
