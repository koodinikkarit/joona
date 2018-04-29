import * as React from "react";

import { Panel } from "react-bootstrap";
import { EwDatabasesListResults } from ".";
// import { AppendBottom } from "../layout";

export const EwDatabasesList = () => {
	return (
		<Panel>
			<Panel.Heading>Ewtietokannat</Panel.Heading>
			<Panel.Body>
				{/* <AppendBottom>
					<FormControl type="text" placeholder="Hakusana" />
				</AppendBottom> */}
				<EwDatabasesListResults />
			</Panel.Body>
		</Panel>
	);
};
