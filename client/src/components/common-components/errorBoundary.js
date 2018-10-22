import React, { Component } from 'react'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
const ErrorBoundary = WrapedComponent => {
    return class ErrorBoundaryHOC extends Component {
        constructor(props) {
            super(props)
            this.state = {
                hasError: false
            }
        }
        static displayName=`ErrorBoundaryHOC(${getDisplayName(WrapedComponent)})`
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
            return <WrapedComponent {...this.props}/>
        }
    }
}
export default ErrorBoundary
