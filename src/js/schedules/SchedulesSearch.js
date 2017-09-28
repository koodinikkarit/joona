import React from "react";
import {
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import SchedulesSearchResults from "./SchedulesSearchResults";

export class SchedulesSearch extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SchedulesSearchResults
					getItemLink={this.props.getItemLink} />
			</div>
		);
	}
}

export default compose(

)(SchedulesSearch);