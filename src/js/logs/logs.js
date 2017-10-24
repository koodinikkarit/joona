import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import Table from "react-bootstrap/lib/Table";

import SEARCH_LOGS from "./search_logs.graphql";

const getLogType = (o) => {
	switch(o) {
	case 1:
		return "Database operation";
	default:
		return "";
	}
};

export const getDateField = (unixTime) => {
	const d = new Date(parseInt(unixTime));
	return d.getFullYear() + "." + (d.getMonth()+1) + "." + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
};

export class LogsTable extends React.Component {
	render() {
		return (
			<div style={{
				overflowX: "auto"
			}}>
				<Table striped bordered condensed>
					<thead>
						<tr>
							<td>
								Tyyppi
							</td>
							<td>
								Viesti
							</td>
							<td>
								Päivä
							</td>
						</tr>						
					</thead>
					<tbody>
						{this.props.logs.map(log => (
							<tr key={log.id}>
								<td>
									{getLogType(log.logType)}
								</td>
								<td>
									{log.message}
								</td>
								<td>
									{getDateField(log.messageDate)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_LOGS, {
		options: () => {
			return {
				variables: {
					params: {

					}
				}
			};
		},
		props: ({
			data: {
				logsConnection
			}
		}) => ({
			logs: logsConnection ? logsConnection.logs : []
		})
	})
)(LogsTable);