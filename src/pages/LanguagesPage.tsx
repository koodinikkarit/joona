import * as React from "react";
import { Grid } from "react-bootstrap";
import { LanguagesSearch, CreateLanguage } from "../languages";

export const LanguagesPage = () => {
	return (
		<Grid>
			<div
				style={{
					marginBottom: "10px"
				}}
			>
				<CreateLanguage />
			</div>
			<LanguagesSearch />
		</Grid>
	);
};
