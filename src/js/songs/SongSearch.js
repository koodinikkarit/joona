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

import {
	List
} from "../styles/List.css";

export class SongSearch extends React.Component {
	render() {
		return (
			<div>
				{this.props.addSongButtonEnabled &&
				<div className={classes.AppendBottomMedium}>
					<Link to="/createsong">
						<Button>
							Luo uusi laulu
						</Button>
					</Link>
				</div>}
				<div className={classes.RectBox + " " + classes.BoxInnerMedium}>
					<div className={classes.AppendBottomBig}>
						<input type="text" className={textInput} placeholder="Hakusana" />
					</div>
					<ul className={List}
						style={{
							overflow: "auto",
							maxHeight: "600px"
						}}>
					{!this.props.loading && this.props.variations.map(p => (
						<li className={classes.RectBox + " " + classes.BoxInnerMedium + " " + classes.AppendBottomSmall}
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
				</div>
			</div>
		)
	}
}

export default compose(
	graphql(SEARCH_VARIATIONS, {
		options: ({
			songDatabaseFilterId
		}) => {
			return {
				variables: {
					params: {
						songDatabaseFilterId
					}
				}
			}
		},
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