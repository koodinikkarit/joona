import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import SongTextEditor from "./SongTextEditor";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomMedium,
	AppendBottomBig,
	AppendRight
} from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import {
	VariationTextArea
} from "./EditSong.css";

import FETCH_VARIATION_QUERY from "./fetch_variation_query.graphql";
import EDIT_VARIATION_MUTATION from "./edit_variation_mutation.graphql";
import REMOVE_VARIATION_MUTATION from "./remove_variation_mutation.graphql";

export class EditSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			text: ""
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.variation) {
			this.setState({
				name: nextProps.variation.name,
				text: nextProps.variation.text
			});
		}
	}

	render() {


		if (this.props.loading) {
			return <div />;
		} else {
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
					<Button bsStyle="danger" className={AppendRight}
						onClick={e => {
							this.props.removeVariation(this.props.variation.id).then(data => {
								if (this.props.onRemove) {
									this.props.onRemove();
								}
							});
						}}>
						Poista
					</Button>
					<Button bsStyle="success"
						onClick={e => {
							this.props.editVariation({
								id: this.props.variation.id,
								name: this.state.name,
								text: this.state.text
							}).then(data => {
								if (this.props.onSuccess) {
									this.props.onSuccess();
								}
							});
						}}>
						Tallenna
					</Button>
				</div>
			);
		}
	}
}

export default compose(
	graphql(FETCH_VARIATION_QUERY, {
		options: (ownProps) => {
			return {
				variables: {
					variationId: ownProps.variationId
				}
			};
		},
		props: ({
			data: {
				loading,
				variation
			}
		}) => ({
			loading,
			variation: variation
		})
	}),
	graphql(EDIT_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			editVariation: ({
				id,
				name,
				text
			}) => mutate({
				variables: {
					params: {
						variationId: id,
						name,
						text
					}
				}
			})
		})
	}),
	graphql(REMOVE_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			removeVariation: (id) => mutate({
				variables: {
					variationId: id
				},
				updateQueries: {
					searchVariations: (prev, { mutationResult }) => {
						return Object.assign({}, prev, {
							variationsConnection: {
								...prev.variationsConnection,
								variations: prev.variationsConnection.variations.filter(p => p.id !== id)
							}
						});
					}
				}
			})
		})	
	})
)(EditSong);