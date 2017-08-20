import React from "react";
import {
	compose
} from "react-apollo";

import {
	RectBox,
	BoxInnerMedium
} from "../styles/Layout.css";

export class TagSearch extends React.Component {
	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium}>
				
			</div>
		);
	}
}

export default compose(

)(TagSearch);