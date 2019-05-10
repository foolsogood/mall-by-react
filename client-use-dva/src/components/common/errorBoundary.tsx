import React, { Component } from "react";
interface State{
  hasError: boolean,
  errorInfo: string
}
interface Props{
  children:React.ReactNode
}
class ErrorBoundary extends Component<Props,State> {
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
