import React from "react";
import {
	compose
} from "react-apollo";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import UpdateSchedule from "../schedules/UpdateSchedule";
import SchedulesSearch from "../schedules/SchedulesSearch";

export class UpdateSchedulePage extends React.Component {
	render() {
		const {
			scheduleId
		} = this.props.match.params;
		return (
			<Row>
				<Col md={6}>
					<UpdateSchedule 
						scheduleId={scheduleId}
						onSave={() => {
							this.props.history.push("/schedules");
						}}
						onRemove={() => {
							this.props.history.push("/schedules");
						}}
						getCancelLinkPath={() => "/schedules"} />
				</Col>
				<Col md={6}>
					<SchedulesSearch />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(UpdateSchedulePage);