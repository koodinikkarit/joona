import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

import Button from "react-bootstrap/lib/Button";

import {
	AppendBottomMedium,
	RectBox,
	BoxInnerMedium,
	AppendBottomBig,
	AppendBottomSmall
} from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import {
	List
} from "../styles/List.css";

export class EwDatabasesSearch extends React.Component {
	render() {
		console.log("rener ewDatabases");
		return (
			<div>
				<div className={AppendBottomMedium}>
					<Link to="/createewdatabase">
						<Button>
							Luo uusi ew tietokanta
						</Button>
					</Link>
				</div>
				<div className={RectBox + " " + BoxInnerMedium}>
				</div>
			</div>
		)
	}
}

export default compose(

)(EwDatabasesSearch);