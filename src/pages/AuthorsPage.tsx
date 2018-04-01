import * as React from "react";
import { Grid } from "react-bootstrap";
import { AuthorsSearch, CreateAuthor } from "../authors";

export const AuthorsPage = () => {
	return (
		<Grid>
			<div
				style={{
					marginBottom: "10px"
				}}
			>
				<CreateAuthor />
			</div>
			<AuthorsSearch />
		</Grid>
	);
};
