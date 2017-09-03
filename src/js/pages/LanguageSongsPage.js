import React from "react";
import {
	compose
} from "react-apollo";


import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import SongSearch from "../songs/SongSearch";

export class LanguageSongsPage extends React.Component {
	render() {
		const {
			languageId
		} = this.props.match.params;

		return (
			<Row>
				<Col md={12}>
					<SongSearch
						languageId={languageId}
						getSongItemLink={id => {
							return `/language/${languageId}/editsong/${id}`;
						}} />
				</Col>
			</Row>
		);
	}
}

export default compose(

)(LanguageSongsPage);

