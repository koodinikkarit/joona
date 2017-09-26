import React from "react";
import {
	graphql,
	compose
} from "react-apollo";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomSmall,
	AppendBottomBig
} from "../styles/Layout.css";

import {
	List
} from "../styles/List.css";

import DelayTextInput from "../common/DelayTextInput";

export class SongsMultiselect extends React.Component {
	state: {
		changed: {}
	}

	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium}>
				<div className={AppendBottomBig}>
					<DelayTextInput />
				</div>
				<ul className={List}>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}
						style={{
							backgroundColor: "green"
						}}>
						a
					</li >
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						b
					</li>
					<li className={RectBox + " " + BoxInnerMedium + " " + AppendBottomSmall}>
						c
					</li>
				</ul>
			</div>
		)
	}
}

export default compose(

)(SongsMultiselect);