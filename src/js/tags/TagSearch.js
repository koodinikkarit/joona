import React from "react";
import {
	compose
} from "react-apollo";

import {
	RectBox,
	BoxInnerMedium,
//	AppendBottomMedium
} from "../styles/Layout.css";

//import DelayTextInput from "../common/DelayTextInput";

import TagSearchResults from "./TagSearchResults";

export class TagSearch extends React.Component {
	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium}>
				{/*<div className={AppendBottomMedium}> 
					<DelayTextInput
						placeholder="Hakusana" />
				</div>*/}
				<TagSearchResults
					getItemLink={this.props.getItemLink} />
			</div>
		);
	}
}

export default compose(

)(TagSearch);