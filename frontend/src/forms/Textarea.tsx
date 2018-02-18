import * as React from "react";

import { FormControl } from "react-bootstrap";

type TextareaInputProps = {
	placeholder?: string;
	value?: string;
	delay?: number;
	style?: React.CSSProperties;
	onChange?: (value: string) => void;
};

type TextareaStateProps = {
	value: string;
	onChangeTimer: NodeJS.Timer | number | undefined;
};

export class Textarea extends React.Component<
	TextareaInputProps,
	TextareaStateProps
> {
	state = {
		value: this.props.value,
		onChangeTimer: undefined
	};

	componentWillReceiveProps(nextProps: TextareaInputProps) {
		if (nextProps.value != null) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	render() {
		return (
			<FormControl
				type="textarea"
				style={this.props.style}
				componentClass="textarea"
				placeholder={this.props.placeholder}
				value={this.state.value}
				onChange={e => {
					if (this.props.onChange) {
						const target = e.target as HTMLInputElement;
						const value = target.value;
						if (value && value !== this.state.value) {
							this.setState({
								value
							});
							if (this.props.delay) {
								if (this.state.onChangeTimer) {
									clearTimeout(this.state
										.onChangeTimer as NodeJS.Timer);
								}
								this.state.onChangeTimer = setTimeout(() => {
									this.props.onChange(value);
								}, this.props.delay);
							} else {
								this.props.onChange(value);
							}
						} else {
							clearTimeout(this.state.onChangeTimer);
						}
					}
				}}
			/>
		);
	}
}
