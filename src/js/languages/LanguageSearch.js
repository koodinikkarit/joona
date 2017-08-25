import React from "react";
import {
	compose
} from "react-apollo";

import {
	RectBox,
	BoxInnerMedium
} from "../styles/Layout.css";

import LanguageSearchResults from "./LanguageSearchResults";

export class LanguageSearch extends React.Component {
	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium}>
				<LanguageSearchResults
					getItemLink={this.props.getItemLink} />
			</div>
		);
	}
}

export default compose(

)(LanguageSearch);