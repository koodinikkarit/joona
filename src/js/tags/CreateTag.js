import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import {
	textInput
} from "../styles/Form.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomBig,
	AppendBottomMedium,
	AppendRight
} from "../styles/Layout.css";

import CREATE_TAG from "./create_tag.graphql";

export class CreateTag extends React.Component {
	state = {
		name: ""
	};

	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
				<label>
					Nimi
				</label>
				<div>
					<div className={AppendBottomMedium}>
						<input type="text" className={textInput} placeholder="Nimi"
							value={this.state.name}
							onChange={e => {
								this.setState({
									name: e.target.value
								});
							}} />
					</div>
				</div>
				<Link to={
					this.props.getCancelLinkPath ? 
						this.props.getCancelLinkPath() : ""}>
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success"
					onClick={() => {
						this.props.createTag({
							name: this.state.name
						}).then(() => {
							if (this.props.onSuccess) {
								this.props.onSuccess();
							}
						});
					}}>
					Luo tunniste
				</Button>
			</div>
		);
	}
}

export default compose(
	graphql(CREATE_TAG, {
		props: ({ mutate }) => ({
			createTag: (params) => mutate({
				variables: {
					params
				}
			})
		})
	})
)(CreateTag);