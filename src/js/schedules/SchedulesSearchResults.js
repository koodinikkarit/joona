import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	List,
	ListItem
} from "koodinikkarit-ui-kit";

import SEARCH_SCHEDULES from "./search_schedules.graphql";

export class SchedulesSearchResults extends React.Component {
	render() {
		return (
			<div>
				<List>
					{this.props.schedules && this.props.schedules.map(p => (
						<ListItem key={p.id}>
							{this.props.getItemLink ?
								<Link to={this.props.getItemLink(p.id)}>
									{p.name || "Ei nimeä"}
								</Link> :
								<a style={{ cursor: "pointer" }}>
									{p.name || "Ei nimeä"}
								</a>}							
						</ListItem>
					))}
				</List>
			</div>
		);
	}
}

export default compose(
	graphql(SEARCH_SCHEDULES, {
		options: () => {
			return {
				variables: {
					params: {
						
					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				schedulesConnection
			}
		}) => ({
			schedules: schedulesConnection ? schedulesConnection.schedules : [],
			maxSchedules: schedulesConnection ? schedulesConnection.maxSchedules: ""
		})
	})
)(SchedulesSearchResults);