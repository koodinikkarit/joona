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

import FETCH_LANGUAGE_QUERY from "./fetch_language.graphql";
import EDIT_LANGUAGE_MUTATION from "./edit_language.graphql";
import REMOVE_LANGUAGE_MUTATION from "./remove_language.graphql";

export class EditLanguage extends React.Component {
	state = {
		name: ""
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.language) {
			this.setState({
				name: nextProps.language.name
			});
		}
	}

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
				<Link to={this.props.getCancelLinkPath ? this.props.getCancelLinkPath() : ""}>
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="danger" className={AppendRight}
					onClick={() => {
						this.props.removeLanguage(this.props.languageId).then(() => {
							if (this.props.onRemove) {
								this.props.onRemove();
							}
						});
					}}>
					Poista
				</Button>
				<Button bsStyle="success"
					onClick={() => {
						this.props.editLanguage({
							languageId: this.props.id,
							name: this.props.name
						}).then(() => {
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

export default compose(
	graphql(FETCH_LANGUAGE_QUERY, {
		options: ({
			languageId
		}) => ({
			variables: {
				languageId
			}
		}),
		props: ({
			data: {
				loading,
				language
			}
		}) => ({
			loading,
			language
		})
	}),
	graphql(EDIT_LANGUAGE_MUTATION, {
		props: ({ mutate }) => ({
			editLanguage: (params) => mutate({
				variables: {
					params
				}
			})
		})
	}),
	graphql(REMOVE_LANGUAGE_MUTATION, {
		props: ({ mutate }) => ({
			removeLanguage: (languageId) => mutate({
				variables: {
					languageId
				}
			})
		})
	})
)(EditLanguage);