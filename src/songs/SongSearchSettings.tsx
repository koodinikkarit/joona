import * as React from "react";

import { Panel } from "react-bootstrap";

import { FieldGroup } from "../forms";

export const SongSearchSettings = () => (
	<Panel header="Lauluhakuasetukset">
		<FieldGroup
			type="text"
			label="Hakusana"
			placeholder="hakusana"
			delay={400}
		/>
	</Panel>
);
