import React from "react";
import {
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import {
	List
} from "../styles/List.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall
} from "../styles/Layout.css";

export class LanguageSearchResults extends React.Component {
	render() {
		return (
			<div>
				<ul className={List}>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link	
							to={this.props.getItemLink(1)}>
							Suomi
						</Link>
					</li>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link
							to={this.props.getItemLink(2)}>
							Englanti
						</Link>
					</li>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						<Link
							to={this.props.getItemLink(3)}>
							Ruotsi
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default compose(

)(LanguageSearchResults);