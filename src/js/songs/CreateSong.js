import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	textInput
} from "../styles/Form.css";

import {
	VariationTextArea
} from "./EditSong.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendRight
} from "../styles/Layout.css";

import Button from "react-bootstrap/lib/Button";

import CREATE_VARIATION_MUTATION from "./create_variation_mutation.graphql";

export class CreateSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			text: ""
		};
	}

	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
				<div className={AppendBottomMedium}>
					<label>
						Nimi
					</label>
					<div>
						<input type="text" className={textInput} placeholder="Nimi"
							value={this.state.name}
							onChange={e => {
								this.setState({
									name: e.target.value
								});
							}} />
					</div>
				</div>
				<div className={AppendBottomMedium}>
					<textarea value={this.state.text} className={VariationTextArea}
						onChange={e => {
							this.setState({
								text: e.target.value
							});
						}} />
				</div>
				<Link to={this.props.getCancelLinkPath ? this.props.getCancelLinkPath() : ""}>
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success"
					onClick={e => {
						this.props.createVariation({
							name: this.state.name,
							text: this.state.text
						}).then(data => {
							if (this.props.onSuccess) {
								this.props.onSuccess();
							}
						});
					}}>
					Luo laulu
				</Button>
			</div>
		);
	}
}

export default compose(
	graphql(CREATE_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			createVariation: (params) => mutate({
				variables: {
					params
				},
				updateQueries: {
					searchVariations: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							variationsConnection: {
								...prev.variationsConnection,
								variations: [
									...prev.variationsConnection.variations,
									mutationResult.data.variation
								]
							}
						});
					}
				}
			})
		})
	})
)(CreateSong);