import React, { Component } from "react";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

// export default function FieldGroup({ id, label, help, ...props }) {
// 	return (
// 		<FormGroup controlId={id}>
// 			<ControlLabel>{label}</ControlLabel>
// 			<FormControl {...props} />
// 			{help && <HelpBlock>{help}</HelpBlock>}
// 		</FormGroup>
// 	);
// }

export default class extends Component {
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
			<FormGroup controlId={this.props.id}>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl
					{...this.props}
					value={this.state.value}
					onChange={e => {
						this.setState({
							value: e.target.value
						});
						if (this.props.delay) {
							if (this.state.onChangeTimer) {
								clearTimeout(this.state.onChangeTimer);
								this.state.onChangeTimer = null;
							}
							this.state.onChangeTimer = setTimeout(() => {
								if (this.props.onChange) {
									this.props.onChange(this.state.value);
								}
							}, this.props.delay);
						} else {
							if (this.props.onChange) {
								this.props.onChange(this.state.value);
							}
						}
					}}
				/>
				{this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
			</FormGroup>
		);
	}
}
