import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: ""
    };
  }
  componentDidCatch(err, info) {
    console.error(err);
    this.setState({
      hasError: true,
      errorInfo: JSON.stringify(info)
    });
  }
  render() {
    const { hasError, errorInfo } = this.state;
    if (hasError) {
      return <div className="page">{errorInfo}</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
