import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

type InputProps = {
	matiasClientId: number;
};

type ResponseProps = {
	data?: {
		loading: boolean;
		allEwDatabases?: {
			totalCount: number;
			ewDatabases?: {
				id: number;
				name: string;
				filesystemPath: string;
			}[];
		};
	};
};

const SEARCH_EW_DATABASES_QUERY = gql`
	query searchEwDatabases($matiasClientId: ID) {
		allEwDatabases: searchEwDatabases(matiasClientId: $matiasClientId) {
			ewDatabases {
				id
				name
				filesystemPath
			}
			totalCount
		}
	}
`;

const withEwDatabases = graphql<ResponseProps, InputProps>(
	SEARCH_EW_DATABASES_QUERY
);

export const MatiasClientEwDatabases = withEwDatabases(
	(props: ResponseProps) => {
		if (props.data.loading) {
			return <h1>Ladataan...</h1>;
		}
		return (
			<Panel header={<h3>Ew tietokannat</h3>}>
				<ListGroup>
					{props.data.allEwDatabases.ewDatabases.map(p => (
						<ListGroupItem key={p.id}>
							<div>{p.name}</div>
							<div>{p.filesystemPath}</div>
						</ListGroupItem>
					))}
				</ListGroup>
			</Panel>
		);
	}
);
