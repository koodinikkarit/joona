import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
  Link
} from 'react-router-dom'

import Button from "react-bootstrap/lib/Button";

import {
	AppendBottomMedium,
	RectBox,
	BoxInnerMedium,
	AppendBottomBig,
	AppendBottomSmall
} from "../styles/Layout.css";

import {
	textInput
} from "../styles/Form.css";

import {
	List
} from "../styles/List.css";

export class SongDatabaseSearch extends React.Component {
	render() {
		return (
			<div>
				<div className={AppendBottomMedium}>
					<Link to="/createsongdatabase">
						<Button>
							Luo uusi laulutietokanta
						</Button>
					</Link>
				</div>
				<div className={RectBox + " " + BoxInnerMedium}>
					<div className={AppendBottomBig}>
						<input type="text" className={textInput} placeholder="Hakusana" />
					</div>
					<ul className={List}>
						<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
							<Link to={"/editsongdatabase/" + 4}>
								Kanta1
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default compose(

)(SongDatabaseSearch);