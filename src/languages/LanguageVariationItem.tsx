import * as React from "react";
import { ListGroupItem } from "react-bootstrap";

export const LanaugeVariationItem = (inputProps: {
	name: string;
	languageId: string;
	variationId: string;
	selected: boolean;
}) => (
	<ListGroupItem bsStyle={inputProps.selected ? "success" : ""}>
		{inputProps.name}
	</ListGroupItem>
);
