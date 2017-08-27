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
	textInput
} from "../styles/Form.css";

import SongSearchResults from "./SongSearchResults";
import DelayTextInput from "../common/DelayTextInput";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall,
	AppendBottomBig,
	AppendBottomMedium
} from "../styles/Layout.css";

export class SongSearch extends React.Component {
	state = {
		searchWord: ""
	};

	constructor(props) {
		super(props);
		if (this.props.searchWord) {
			this.state.searchWord = this.props.searchWord;
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.searchWord) {
			this.setState({
				searchWord: nextProps.searchWord
			});
		}
	}

	render() {
		return (
			<div>
				{this.props.addSongButtonEnabled &&
				<div className={AppendBottomMedium}>
					<Link to="/createsong">
						<Button>
							Luo uusi laulu
						</Button>
					</Link>
				</div>}
				<div className={RectBox + " " + BoxInnerMedium}>
					<div className={AppendBottomBig}>
						<DelayTextInput
							placeholder="Hakusana"
							value={this.state.searchWord}
							delay={400}
							onChange={value => {
								this.setState({
									searchWord: value
								});
								if (this.props.onSearchWordChanged) {
									this.props.onSearchWordChanged(value);
								}
							}} />
					</div>
					<SongSearchResults
						songItemClick={this.props.songItemClick}
						getSongItemLink={this.props.getSongItemLink}
						searchWord={this.state.searchWord}
						songDatabaseId={this.props.songDatabaseId}
						songDatabaseFilterId={this.props.songDatabaseFilterId} />
				</div>
			</div>
		);
	}
}

export default compose(

)(SongSearch);