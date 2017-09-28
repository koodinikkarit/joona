import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import {
	RectBoxInner,
	AppendBottom
} from "koodinikkarit-ui-kit";

import SearchOneSongSearchResults from "./SearchOneSongSearchResults";

import InputGroup from "react-bootstrap/lib/InputGroup";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";


import SongSearchResults from "./SongSearchResults";
import DelayTextInput from "../common/DelayTextInput";

export class SearchOneSong extends React.Component {
	state = {
		searchWord
	}

	render() {
		return (
			<RectBoxInner>
				<AppendBottom>
					<InputGroup>
						<DelayTextInput
							placeholder="Hakusana"
							value={this.state.searchWord}
							delay={400}
							onChange={value => {
								this.setState({
									searchWord: value
								});
							}} />
					</InputGroup>
				</AppendBottom>
				<SearchOneSongSearchResults 
					searchWord={this.state.searchWord} />
			</RectBoxInner>
		);
	}
}

export default compose(

)(SearchOneSong);