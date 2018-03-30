// import * as React from "react";
// import gql from "graphql-tag";
// import { graphql } from "react-apollo";

// type InputProps = {
// 	value?: number;
// 	onChange?: (id: number) => void;
// };

// type ResponseProps = {
// 	data?: {
// 		allSongDatabases: {
// 			songDatabases: {
// 				id: number;
// 				name: string;
// 			}[];
// 		};
// 	};
// 	value?: number;
// 	onChange?: (id: number) => void;
// };

// const ALL_SONG_DATABASES_QUERY = gql`
// 	query searchSongDatabases {
// 		allSongDatabases: searchSongDatabases {
// 			songDatabases {
// 				id
// 				name
// 			}
// 		}
// 	}
// `;

// const withSongDatabases = graphql<ResponseProps, InputProps>(
// 	ALL_SONG_DATABASES_QUERY
// );

// export const SongDatabasesSelect = withSongDatabases((props: ResponseProps) => {
// 	const songDatabases = props.data.allSongDatabases
// 		? props.data.allSongDatabases.songDatabases
// 		: [];
// 	return (
// 		<select
// 			value={props.value}
// 			onChange={e => {
// 				if (props.onChange) {
// 					const target = e.target;
// 					props.onChange(parseInt(target.value, 10));
// 				}
// 			}}
// 		>
// 			<option value="">valitse</option>
// 			{songDatabases.map(p => (
// 				<option key={p.id} value={p.id}>
// 					{p.name}
// 				</option>
// 			))}
// 		</select>
// 	);
// });
