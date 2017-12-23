import React, { Component } from "react";

import Panel from "react-bootstrap/lib/Panel";
import FieldGroup from "../form/FieldGroup";

import TagSearchSelect from "../tags/TagSearchSelect";

export default class SongSearchSetting extends Component {
	render() {
		return (
			<Panel header={<h4>Lauluhakuasetukset</h4>}>
				<FieldGroup
					type="text"
					label="Hakusana"
					placeholder="hakusana"
					delay={400}
					value={this.props.searchWord}
					onChange={value => {
						if (this.props.onSearchwordChanged) {
							this.props.onSearchwordChanged(value);
						}
					}}
				/>
				<TagSearchSelect />
			</Panel>
		);
	}
}
