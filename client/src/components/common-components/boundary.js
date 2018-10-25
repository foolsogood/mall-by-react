import React, { Component } from 'react';

const style = {
	width: '350px',
	marginLeft: '20px',
	marginTop: '20px',
	display: 'inline-block'
};

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}
	componentDidCatch(error, info) {
		this.setState({
			hasError: true
		});
	}
	render() {
		if(this.state.hasError) {
			return (
				<div style={style}>
				something is wrong
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;