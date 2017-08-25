import React from "react";
import {
	compose
} from "react-apollo";

import {
	Link
} from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import {
	textInput
} from "../styles/Form.css";

import {
	RectBox,
	BoxInnerMedium,
	AppendBottomBig,
	AppendBottomMedium,
	AppendRight
} from "../styles/Layout.css";

export class EditTag extends React.Component {
	state = {
		name: ""
	}

	render() {
		return (
			<div className={RectBox + " " + BoxInnerMedium + " " + AppendBottomBig}>
				<label>
					Nimi
				</label>
				<div>
					<div className={AppendBottomMedium}>
						<input type="text" className={textInput} placeholder="Nimi"
							value={this.state.name}
							onChange={e => {
								this.setState({
									name: e.target.value
								});
							}} />
					</div>
				</div>
				<Link to="/tags">
					<Button className={AppendRight}>
						Peruuta
					</Button>
				</Link>
				<Button bsStyle="success">
					Tallenna
				</Button>
			</div>
		);
	}
}

export default compose(

)(EditTag);