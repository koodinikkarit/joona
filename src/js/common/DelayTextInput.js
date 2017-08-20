import React from "react";

import FormControl from "react-bootstrap/lib/FormControl";

export default class DelayTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onChangeTimer: null,
			value: this.props.value || ""
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value != null) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	render() {
		return (
			<FormControl
				placeholder={this.props.placeholder}
				type="text"
				value={this.state.value}
				onChange={e => {
					this.setState({
						value: e.target.value
					});
					if (this.state.onChangeTimer) {
						clearTimeout(this.state.onChangeTimer);
						this.state.onChangeTimer = null;
					}
					this.state.onChangeTimer = setTimeout(() => {
						if (this.props.onChange) this.props.onChange(this.state.value);
					}, this.props.delay);

				}} />
		);
	}
}