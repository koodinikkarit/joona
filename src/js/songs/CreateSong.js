import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

import classes from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import Button from "react-bootstrap/lib/Button";

import CREATE_VARIATION_MUTATION from "./create_variation_mutation.graphql";

export class CreateSong extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	render() {
		return (
			<div className={classes.RectBox + " " + classes.BoxInnerMedium + " " + classes.AppendBottomBig}>
				<div className={classes.AppendBottomMedium}>
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
				<Link to="/songs">
					<Button className={classes.AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success"
					onClick={e => {
						this.props.createVariation({
							name: this.state.name
						});
					}}>
					Luo laulu
				</Button>
			</div>
		)
	}
}

export default compose(
	graphql(CREATE_VARIATION_MUTATION, {
		props: ({ mutate }) => ({
			createVariation: ({
				name
			}) => mutate({
				variables: {
					name
				}
			})
		})
	})
)(CreateSong);