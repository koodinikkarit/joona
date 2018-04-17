import * as React from "react";

import { match } from "react-router";

import { Grid, Row, Col } from "react-bootstrap";
import { SongDatabaseInfo, SongDatabaseVariations } from "../songdatabases";

type InputProps = {
	match: match<{
		songDatabaseId: string;
	}>;
};

export const SongDatabasePage = (inputProps: InputProps) => {
	return (
		<Grid>
			<Row>
				<Col sm={5}>
					<SongDatabaseInfo
						songDatabaseId={inputProps.match.params.songDatabaseId}
					/>
				</Col>
				<Col sm={5}>
					<SongDatabaseVariations
						songDatabaseId={inputProps.match.params.songDatabaseId}
					/>
				</Col>
			</Row>
		</Grid>
	);
};

// // import gql from "graphql-tag";
// // import { graphql, compose } from "react-apollo";

// import { Grid, Row, Col } from "react-bootstrap";

// import { UpdateSongDatabase } from "../songdatabases";

// type SongDatabasePageInputProps = {};

// const SongDatabasePagePC = (props: SongDatabasePageInputProps) => {
// 	return (
// 		<Grid fluid={true}>
// 			<Row>
// 				<Col sm={3}>
// 					<UpdateSongDatabase />
// 				</Col>
// 				<Col sm={9}>variatiot</Col>
// 			</Row>
// 			<Row>
// 				<Col sm={4}>Lauluhakuasetukset</Col>
// 				<Col sm={4}>Lauluhakutulokset</Col>
// 				<Col sm={4}>Laulutietokannat</Col>
// 			</Row>
// 		</Grid>
// 	);
// };

// export const SongDatabasePage = SongDatabasePagePC;
