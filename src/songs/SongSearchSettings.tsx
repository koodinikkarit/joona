import * as React from "react";

import { Panel, FormControl } from "react-bootstrap";

export const SongSearchSettings = () => (
	<Panel>
		<Panel.Heading>Lauluhakuasetukset</Panel.Heading>
		<Panel.Body>
			<FormControl type="text" label="Hakusana" placeholder="hakusana" />
		</Panel.Body>
	</Panel>
);
