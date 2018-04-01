import * as React from "react";
import { Grid } from "react-bootstrap";
import { CreateCopyright, CopyrightsSearch } from "../copyrights";

export const CopyrightsPage = () => {
	return (
		<Grid>
			<div
				style={{
					marginBottom: "10px"
				}}
			>
				<CreateCopyright />
			</div>
			<CopyrightsSearch />
		</Grid>
	);
};
