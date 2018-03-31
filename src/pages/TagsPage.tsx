import * as React from "react";

import { Grid } from "react-bootstrap";
import { TagSearch, CreateTag } from "../tags";

export const TagsPage = () => {
	return (
		<Grid>
			<div
				style={{
					marginBottom: "10px"
				}}
			>
				<CreateTag />
			</div>
			<TagSearch />
		</Grid>
	);
};
