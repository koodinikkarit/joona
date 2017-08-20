import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

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
					maxHeight: "600px"
				}}>
				{!this.props.loading && this.props.variations.map(p => (
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}
						onClick={() => {
							if (this.props.songItemClick) {
								this.props.songItemClick(p.id)
							}
						}}>
						{this.props.getSongItemLink ?
							<Link to={this.props.getSongItemLink(p.id)}>
								{p.name}
							</Link> :
							<a style={{ cursor: "pointer" }}>
								{p.name}
							</a>}
					</li>
				))}
			</ul>
				Kaikki laulut {this.props.maxVariations}
			</div>
		)
	}
}

export default compose(
	graphql(SEARCH_VARIATIONS, {
		options: ({
			searchWord,
			songDatabaseId,
			songDatabaseFilterId
		}) => {
			return {
				variables: {
					params: {
						searchWord,
						songDatabaseId,
						songDatabaseFilterId
					}
				},
				fetchPolicy: "cache-and-network"
			}
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