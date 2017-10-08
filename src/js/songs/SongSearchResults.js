import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import SEARCH_VARIATIONS from "./search_variations.graphql";
import {
	List
} from "../styles/List.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall
} from "../styles/Layout.css";

export class SongSearchResults extends React.Component {
	render() {
		return (
			<div>
				<ul className={List}
					style={{
						overflow: "auto",
						maxHeight: this.props.maxHeight || "600px"
					}}>
					{!this.props.loading && this.props.variations.map(p => (
						<li key={p.id} className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}
							onClick={() => {
								if (this.props.onItemClick) {
									this.props.onItemClick(p.id);
								}
							}}>
							{this.props.getSongItemLink ?
								<Link to={this.props.getSongItemLink(p.id)}>
									{p.name || "Ei nimeä"}
								</Link> :
								<a style={{ cursor: "pointer" }}>
									{p.name || "Ei nimeä"}
								</a>}
						</li>
					))}
				</ul>
				{!this.props.loading && (
					<label>
						Näytetään {this.props.variations.length} tulosta {this.props.maxVariations} tuloksesta
					</label>
				)}
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_VARIATIONS, {
		options: ({
			searchWord,
			songDatabaseId,
			songDatabaseFilterId,
			tagId,
			languageId,
			limit,
			skipVariationIds
		}) => {
			return {
				variables: {
					params: {
						searchWord,
						songDatabaseId,
						songDatabaseFilterId,
						tagId,
						languageId,
						limit,
						skipVariationIds
					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				loading,
				variationsConnection
			}
		}) => ({
			loading,
			variations: !loading ? variationsConnection.variations : [],
			maxVariations: !loading ? variationsConnection.maxVariations : ""
		})
	})
)(SongSearchResults);