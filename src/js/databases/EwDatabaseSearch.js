import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

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

import SEARCH_EW_DATABASES_QUERY from "./search_ew_databases_query.graphql";

export class EwDatabasesSearch extends React.Component {
	render() {
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
					<ul className={List}>
						{this.props.ewDatabases.map(p => (
							<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
								<Link to={"/editewdatabase/" + p.id}>
									{p.name || "Tyhjä"}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_EW_DATABASES_QUERY, {
		options: ({
		}) => {
			return {
				variables: {
					params: {

					}
				}
			};
		},
		props: ({
			data: {
				loading,
				ewDatabasesConnection
			}
		}) => ({
			loading,
			ewDatabases: !loading ? ewDatabasesConnection.ewDatabases : []
		})
	})
)(EwDatabasesSearch);