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

import SEARCH_SONG_DATABASES from "./search_song_databases.graphql";

export class SongDatabaseSearch extends React.Component {
	render() {
		if (!this.props.loading) {
			return (
				<div>
					{this.props.createNewSongDatabaseEnabled &&
					<div className={AppendBottomMedium}>
						<Link to="/createsongdatabase">
							<Button>
								Luo uusi laulutietokanta
						</Button>
						</Link>
					</div>}
					<div className={RectBox + " " + BoxInnerMedium}>
						<div className={AppendBottomBig}>
							<input type="text" className={textInput} placeholder="Hakusana" />
						</div>
						<ul className={List}>
							{this.props.songDatabases.map(p => (
								<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
									<Link to={"/editsongdatabase/" + p.id}>
										{p.name || "Tyhjä"}
									</Link>
								</li>
							))}							
						</ul>
					</div>
				</div>
			);
		} else {
			return <div />
		}
	}
}

export default compose(
	graphql(SEARCH_SONG_DATABASES, {
		props: ({
			data: {
				loading,
				songDatabasesConnection
			}
		}) => ({
			loading,
			songDatabases: !loading ? songDatabasesConnection.songDatabases : []
		})
	})
)(SongDatabaseSearch);