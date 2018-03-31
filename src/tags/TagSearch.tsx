import * as React from "react";
import { Panel, ControlLabel, FormControl } from "react-bootstrap";
import { TagsSearchResults } from "./TagsSearchResults";

export class TagSearch extends React.Component {
	state = {
		searchWord: ""
	};

	render() {
		return (
			<Panel>
				<Panel.Heading>Hae tunnisteita</Panel.Heading>
				<Panel.Body>
					<div
						style={{
							marginBottom: "10px"
						}}
					>
						<ControlLabel>Hakusana</ControlLabel>
						<FormControl
							type="text"
							placeholder="Hakusana"
							value={this.state.searchWord}
							onChange={e => {
								const target = e.target as HTMLInputElement;
								this.setState({
									searchWord: target.value
								});
							}}
						/>
					</div>
					<TagsSearchResults searchWord={this.state.searchWord} />
				</Panel.Body>
			</Panel>
		);
	}
}
