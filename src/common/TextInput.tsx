import * as React from "react";

import { FormControl } from "react-bootstrap";

type TextInputProps = {
	placeholder?: string;
	value?: string;
	delay?: number;
	onChange?: (newValue: string) => void;
};

type TextInputState = {
	value: string;
	onChangeTimer?: NodeJS.Timer | number | undefined;
};

export class TextInput extends React.Component<TextInputProps, TextInputState> {
	state = {
		value: this.props.value,
		onChangeTimer: undefined
	};

	// componentWillReceiveProps(nextProps: TextInputProps) {
	// 	if (nextProps.value != null) {
	// 		this.setState({
	// 			value: nextProps.value
	// 		});
	// 	}
	// }

	render() {
		return (
			<FormControl
				type="text"
				placeholder={this.props.placeholder}
				value={this.state.value}
				onChange={e => {
					if (this.props.onChange) {
						const target = e.target as HTMLInputElement;
						const value = target.value;
						if (value != null && value !== this.state.value) {
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
