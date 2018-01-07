import * as React from "react";

import { ControlLabel, FormGroup, FormControl } from "react-bootstrap";

type FieldGroupInputTypes = {
	value?: string | number;
	label?: string;
	onChange?: (value: string | number) => void;
	checkValue?: (value: string | number) => boolean;
	delay?: number;
	min?: number;
	max?: number;
	placeholder?: string;
	type?:
		| "text"
		| "email"
		| "select"
		| "file"
		| "radio"
		| "checkbox"
		| "textarea"
		| "button"
		| "reset"
		| "submit"
		| "date"
		| "datetime-local"
		| "hidden"
		| "image"
		| "month"
		| "number"
		| "range"
		| "search"
		| "tel"
		| "url"
		| "week"
		| "password"
		| "datetime"
		| "time"
		| "color";
};

export class FieldGroup extends React.Component<FieldGroupInputTypes, Object> {
	state: {
		value: string | number;
		onChangeTimer?: NodeJS.Timer | number | undefined;
	};

	constructor(props: FieldGroupInputTypes) {
		super(props);
		this.state = {
			value: this.props.value || ""
		};
	}

	componentWillReceiveProps(nextProps: FieldGroupInputTypes) {
		if (nextProps.value != null) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	render() {
		return (
			<FormGroup>
				<ControlLabel>{this.props.label}</ControlLabel>
				<FormControl
					type={this.props.type}
					value={this.state.value}
					min={this.props.min}
					max={this.props.max}
					placeholder={this.props.placeholder}
					onChange={e => {
						const target = e.target as HTMLInputElement;
						if (
							!this.props.checkValue ||
							this.props.checkValue(target.value)
						) {
							this.setState({
								value: target.value
							});

							if (this.props.delay) {
								if (this.state.onChangeTimer) {
									clearTimeout(this.state
										.onChangeTimer as NodeJS.Timer);
								}
								this.state.onChangeTimer = setTimeout(() => {
									if (this.props.onChange) {
										this.props.onChange(this.state.value);
									}
								}, this.props.delay);
							} else {
								if (this.props.onChange) {
									this.props.onChange(target.value);
								}
							}
						} else {
							e.preventDefault();
						}
					}}
				/>
			</FormGroup>
		);
	}
}
