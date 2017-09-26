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

import FETCH_TAG_QUERY from "./fetch_tag.graphql";
import EDIT_TAG_MUTATION from "./edit_tag.graphql";
import REMOVE_TAG_MUTATION from "./remove_tag.graphql";

export class EditTag extends React.Component {
	state = {
		name: this.props.tag ? this.props.tag.name : ""
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tag) {
			this.setState({
				name: nextProps.tag.name
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
						this.props.removeTag({ tagId: this.props.tag.id }).then(() => {
							if (this.props.onRemove) {
								this.props.onRemove();
							}
						});
					}}>
					Poista
				</Button>
				<Button bsStyle="success"
					onClick={() => {
						this.props.editTag({
							tagId: this.props.tag.id,
							name: this.state.name
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
	graphql(FETCH_TAG_QUERY, {
		options: ({
			tagId
		}) => ({
			variables: {
				tagId
			}
		}),
		props: ({
			data: {
				loading,
				tag
			}
		}) => ({
			loading,
			tag
		})
	}),
	graphql(EDIT_TAG_MUTATION, {
		props: ({ mutate }) => ({
			editTag: ({
				tagId,
				name
			}) => mutate({
				variables: {
					params: {
						tagId,
						name
					}
				}
			})
		})
	}),
	graphql(REMOVE_TAG_MUTATION, {
		props: ({ mutate }) => ({
			removeTag: (params) => mutate({
				variables: {
					params
				}
			})
		})
	})
)(EditTag);