import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	List
} from "../styles/List.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall
} from "../styles/Layout.css";

import SEARCH_LANGUAGES from "./search_languages.graphql";

export class LanguageSearchResults extends React.Component {
	render() {
		return (
			<div>
				<ul className={List}>
					{this.props.languages.map(p => (
						<li key={p.id} 
							className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
							<Link
								to={this.props.getItemLink(p.id)}>
								{p.name || "Ei nimeä"}
							</Link>
							<div style={{
								float: "right"
							}}>
								<Link to={`/language/${p.id}/songs`}>
									Laulut
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_LANGUAGES, {
		options: () => {
			return {
				variables: {
					params: {

					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				loading,
				maxLanguages,
				languagesConnection
			}
		}) => ({
			loading,
			maxLanguages,
			languages: !loading ? languagesConnection.languages : []
		})
	})
)(LanguageSearchResults);