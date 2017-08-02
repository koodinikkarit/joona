import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import SEARCH_SONG_DATABASES from "./search_song_databases.graphql";

export class SongDatabasesSelect extends React.Component {
	render() {
		if (!this.props.loading) {
			if (this.props.onChange && 
				!this.props.value &&
				this.props.songDatabases && 
				this.props.songDatabases.length > 0) {
				this.props.onChange(this.props.songDatabases[0].id);
			}
			return (
				<select value={this.props.value}
					onChange={e => {
						if (this.props.onChange) {
							this.props.onChange(e.target.value);
						}
					}}>
					{this.props.songDatabases.map(p => (
						<option key={p.id} value={p.id}>
							{p.name}
						</option>
					))}
				</select>
			);
		} else {
			return (
				<select>
				</select>
			)
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
)(SongDatabasesSelect);