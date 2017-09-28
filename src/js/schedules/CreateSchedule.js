import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	RectBoxInner,
	AppendBottom,
	AppendRight
} from "koodinikkarit-ui-kit";

import Button from "react-bootstrap/lib/Button";

import DelayTextInput from "../common/DelayTextInput";

import CREATE_SCHEDULE from "./create_schedule.graphql";

export class CreateSchedule extends React.Component {
	state = {
		name: ""
	}

	render() {
		return (
			<RectBoxInner>
				<AppendBottom>
					<label>
						Nimi
					</label>
					<DelayTextInput value={this.state.name}
						onChange={value => {
							this.setState({
								name: value
							});
						}} />
				</AppendBottom>
				<AppendRight>
					<Link to={this.props.getCancelLinkPath ? this.props.getCancelLinkPath() : ""}>
						<Button>
							Peruuta
						</Button>
					</Link>
				</AppendRight>
				<Button bsStyle="success"
					onClick={() => {
						this.props.createSchedule({
							name: this.state.name
						}).then(() => {
							if (this.props.onCreate) {
								this.props.onCreate();
							}
						});
					}}>
					Luo aikataulu
				</Button>
			</RectBoxInner>
		);
	}
}

export default compose(
	graphql(CREATE_SCHEDULE, {
		props: ({ mutate }) => ({
			createSchedule: (params) => mutate({
				variables: {
					params
				}
			})
		})
	})
)(CreateSchedule);