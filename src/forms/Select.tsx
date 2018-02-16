import * as React from "react";

import { FormControl } from "react-bootstrap";

type SelectProps = {
	value?: string;
	delay?: number;
	children?: any;
	placeholder?: string;
	onChange?: (value: string) => void;
};

type SelectState = {
	value: string;
	onChangeTimer?: NodeJS.Timer | number | undefined;
};

export class Select extends React.Component<SelectProps, SelectState> {
	state = {
		value: "",
		onChangeTimer: undefined
	};

	componentWillReceiveProps(nextProps: SelectProps) {
		if (nextProps.value != null) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	render() {
		return (
			<FormControl
				type="select"
				componentClass="select"
				placeholder={this.props.placeholder}
				value={this.props.value}
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
			>
				{this.props.children}
			</FormControl>
		);
	}
}
