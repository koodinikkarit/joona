import * as React from "react";
import { ListGroupItem } from "react-bootstrap";

export const AuthorVariationItem = (props: {
	name: string;
	selected: boolean;
}) => (
	<ListGroupItem bsStyle={props.selected ? "success" : ""}>
		{props.name}
	</ListGroupItem>
);
