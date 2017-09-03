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

import SEARCH_TAGS_QUERY from "./search_tags.graphql";

export class TagSearchResults extends React.Component {
	render() {
		return (
			<div>
				<ul className={List}>
					{this.props.tags.map(p => (
						<li key={p.id} className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
							<Link to={this.props.getItemLink(p.id)}>
								{p.name}
								<div style={{
									float: "right"
								}}>
									<Link to={`/tag/${p.id}/songs`}>
										Laulut
									</Link>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_TAGS_QUERY, {
		options: () => {
			return {
				variables: {
					parmas: {

					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				loading,
				maxTags,
				tagsConnection
			}
		}) => ({
			loading,
			maxTags,
			tags: !loading ? tagsConnection.tags : []
		})
	})
)(TagSearchResults);