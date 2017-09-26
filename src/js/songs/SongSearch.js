import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Button from "react-bootstrap/lib/Button";
import InputGroup from "react-bootstrap/lib/InputGroup";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

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
		searchWord: "",
		limit: 100
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
						<InputGroup>
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
							<DropdownButton
								componentClass={InputGroup.Button}
								title={this.state.limit === 0 ? "Näytä kaikki" : `Näytä ${this.state.limit} tulosta`}>
								<MenuItem key="1" onClick={() => this.setState({ limit: 50 })}>50</MenuItem>
								<MenuItem key="2" onClick={() => this.setState({ limit: 100 })}>100</MenuItem>
								<MenuItem key="4" onClick={() => this.setState({ limit: 1000 })}>1000</MenuItem>
								<MenuItem key="5" onClick={() => this.setState({ limit: 0 })}>Kaikki</MenuItem>
							</DropdownButton>
						</InputGroup>
					</div>
					<SongSearchResults
						limit={this.state.limit}
						songItemClick={this.props.songItemClick}
						getSongItemLink={this.props.getSongItemLink}
						searchWord={this.state.searchWord}
						songDatabaseId={this.props.songDatabaseId}
						songDatabaseFilterId={this.props.songDatabaseFilterId}
						tagId={this.props.tagId}
						languageId={this.props.languageId} />
				</div>
			</div>
		);
	}
}

export default compose(

)(SongSearch);