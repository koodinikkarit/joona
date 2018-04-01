import * as React from "react";
import { Panel, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import { CopyrightSearchResults } from ".";

export class CopyrightsSearch extends React.Component {
	state = {
		searchWord: ""
	};

	render() {
		return (
			<Panel>
				<Panel.Heading>Hae tekijänoikeusia</Panel.Heading>
				<Panel.Body>
					<FormGroup>
						<ControlLabel>Hakusana</ControlLabel>
						<FormControl
							type="text"
							value={this.state.searchWord}
							placeholder="Hakusana"
							onChange={e => {
								const target = e.target as HTMLInputElement;
								this.setState({
									searchWord: target.value
								});
							}}
						/>
					</FormGroup>
					<CopyrightSearchResults />
				</Panel.Body>
			</Panel>
		);
	}
}
