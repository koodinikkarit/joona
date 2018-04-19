import * as React from "react";

import { Panel, ListGroup } from "react-bootstrap";

import { SongDatabaseVariationsResults } from "./SongDatabaseVariationsResults";
import { TextInput } from "../common";

export class SongDatabaseVariations extends React.Component<{
	songDatabaseId: string;
}> {
	state = {
		searchWord: ""
	};

	render() {
		return (
			<Panel>
				<Panel.Heading>Laulutietokannan laulut</Panel.Heading>
				<Panel.Body>
					<div
						style={{
							marginBottom: "10px"
						}}
					>
						<TextInput
							value={this.state.searchWord}
							onChange={value => {
								this.setState({
									searchWord: value
								});
							}}
							delay={300}
						/>
					</div>
					<ListGroup>
						<SongDatabaseVariationsResults
							songDatabaseId={this.props.songDatabaseId}
							searchWord={this.state.searchWord}
						/>
					</ListGroup>
				</Panel.Body>
			</Panel>
		);
	}
}
