import * as React from "react";

import { Checkbox as BootstrapCheckbox } from "react-bootstrap";

type CheckboxProps = {
	children?: string;
	checked?: boolean;
	delay?: number;
	onChange?: (changed: boolean) => void;
};

type CheckboxState = {
	checked: boolean;
	onChangeTimer: NodeJS.Timer | number | undefined;
};

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
	state = {
		checked: this.props.checked || false,
		onChangeTimer: undefined
	};

	componentWillReceiveProps(nextProps: CheckboxProps) {
		this.setState({
			checked: nextProps.checked || false
		});
	}

	render() {
		return (
			<BootstrapCheckbox
				checked={this.state.checked}
				onChange={e => {
					if (this.props.onChange) {
						const checked = !this.state.checked;
						this.setState({
							checked
						});
						if (this.props.delay) {
							if (this.state.onChangeTimer) {
								clearTimeout(this.state.onChangeTimer);
							}
							this.state.onChangeTimer = setTimeout(() => {
								this.props.onChange(checked);
							}, this.props.delay);
						} else {
							this.props.onChange(checked);
						}
					}
				}}
			>
				{this.props.children}
			</BootstrapCheckbox>
		);
	}
}
