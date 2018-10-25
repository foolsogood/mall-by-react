import React, { Component } from 'react'
const getDisplayName=component=>(
    component.displayName||component.name||'component'
)
const ErrorBoundary = WrapedComponent => {
    return class ErrorBoundaryHOC extends Component {
        constructor(props) {
            super(props)
            this.state = {
                hasError: false,
                errorInfo:''
            }
        }
        static displayName=`ErrorBoundaryHOC(${getDisplayName(WrapedComponent)})`
        componentDidCatch(err, info) {
            console.error(err)
            this.setState({
                hasError: true,
                errorInfo:JSON.stringify(info)
            })
        }
        render() {
            const {hasError,errorInfo}=this.state
            if (hasError) {
                return (
                    <div className="page">
                        {errorInfo}
                    </div>
                )
            }
            return <WrapedComponent {...this.props}/>
        }
    }
}
export default ErrorBoundary
