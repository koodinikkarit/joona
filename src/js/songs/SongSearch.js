import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

import Button from "react-bootstrap/lib/Button";

import classes from "../styles/Layout.css";

import SEARCH_VARIATIONS from "./search_variations.graphql";

import {
	textInput
} from "../styles/Form.css";

export class SongSearch extends React.Component {
	render() {
		console.log("variations", this.props.variations);
		return (
			<div>
				<div className={classes.AppendBottomMedium}>
					<Link to="/createsong">
						<Button>
							Luo uusi laulu
						</Button>
					</Link>
				</div>
				<div className={classes.RectBox + " " + classes.BoxInnerMedium}>
					<div className={classes.AppendBottomBig}>
						<input type="text" className={textInput} placeholder="Hakusana" />
					</div>
					{!this.props.loading && this.props.variations.map(p => (
						<Link to={"/editsong/"+ p.id}>
							<div className={classes.RectBox + " " + classes.BoxInnerMedium + " " + classes.AppendBottomSmall}>
								{p.name}
							</div>
						</Link>
					))}
				</div>
			</div>
		)
	}
}

export default compose(
	graphql(SEARCH_VARIATIONS, {
		props: ({
			data: {
				loading,
				variationsConnection
			}
		}) => ({
			loading,
			variations: !loading ? variationsConnection.variations : []
		})
	})
)(SongSearch);