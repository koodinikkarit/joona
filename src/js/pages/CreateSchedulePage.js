import React from "react";
import {
	compose
} from "react-apollo";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import CreateSchedule from "../schedules/CreateSchedule";
import SchedulesSearch from "../schedules/SchedulesSearch";

export class CreateSchedulePage extends React.Component {
	render() {
		return (
			<Row>
				<Col md={6}>
					<CreateSchedule
						getCancelLinkPath={() => "/schedules"}
						onCreate={() => {
							this.props.history.push("/schedules");
						}} />
				</Col>
				<Col md={6}>
					<SchedulesSearch />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(CreateSchedulePage);