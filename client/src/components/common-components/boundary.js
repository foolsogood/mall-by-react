import React, { PureComponent } from 'react'
export default class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info) {
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
        return this.props.children
    }
}