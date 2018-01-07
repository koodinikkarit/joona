import * as React from "react";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

type MatiasClientEwDatabasesPCInputProps = {
	matiasClientId: number;
};

const MatiasClientEwDatabasesPC = (
	props: MatiasClientEwDatabasesPCInputProps
) => {
	console.log("matisclientid", props.matiasClientId);
	return (
		<Panel header={<h3>Ew tietokannat</h3>}>
			<ListGroup>
				<ListGroupItem>asd</ListGroupItem>
			</ListGroup>
		</Panel>
	);
};

export const MatiasClientEwDatabases = MatiasClientEwDatabasesPC;
