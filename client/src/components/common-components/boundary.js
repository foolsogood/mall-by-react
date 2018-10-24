import React, { Component } from 'react'
export default class ErrorBoundary extends Component {
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