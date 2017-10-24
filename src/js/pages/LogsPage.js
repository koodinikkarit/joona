import React from "react";
import {
	compose
} from "react-apollo";

import Logs from "../logs/logs";

export class LogsPage extends React.Component {
	render() {
		return (
			<Logs />
		);
	}
}

export default compose(

)(LogsPage);