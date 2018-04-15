import * as React from "react";
import { VariationTagsResults } from "./VariationTagsResults";
import { Panel } from "react-bootstrap";

export class VariationTags extends React.Component<{
	variationId: string;
}> {
	state = {
		searchWord: ""
	};

	render() {
		return (
			<Panel>
				<Panel.Heading>Tunnisteet</Panel.Heading>
				<Panel.Body>
					<VariationTagsResults
						variationId={this.props.variationId}
					/>
				</Panel.Body>
			</Panel>
		);
	}
}
