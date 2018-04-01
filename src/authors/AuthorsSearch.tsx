import * as React from "react";
import { Panel } from "react-bootstrap";
import { AuthorsSearchResults } from ".";

export class AuthorsSearch extends React.Component {
	state = {
		searchWord: ""
	};

	render() {
		return (
			<Panel>
				<Panel.Heading>Hae kirjoittajia</Panel.Heading>
				<Panel.Body>
					<AuthorsSearchResults searchWord={this.state.searchWord} />
				</Panel.Body>
			</Panel>
		);
	}
}
