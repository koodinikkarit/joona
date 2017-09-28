import React from "react";
import {
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
	AppendBottom
} from "koodinikkarit-ui-kit";

import SchedulesSearch from "../schedules/SchedulesSearch";

export class SchedulesSearchPage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={12}>
					<AppendBottom>
						<Link to="/createschedule">
							<Button>
								Luo uusi aikataulu
							</Button>
						</Link>
					</AppendBottom>
					<SchedulesSearch 
						getItemLink={id => "/updateschedule/" + id}/>
				</Col>
			</Row>
		);
	}
}

export default compose(

)(SchedulesSearchPage);