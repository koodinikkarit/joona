import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Panel from "react-bootstrap/lib/Panel";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import FieldGroup from "../form/FieldGroup";

import ResizablePanel from "../layout/ResizablePanel";

class EditVariation extends Component {
	render() {
		const variation = this.props.data.variation;
		return (
			<ResizablePanel header={<h4>Muokkaa laulua</h4>}>
				<FieldGroup
					type="text"
					label="Nimi"
					placeholder="nimi"
					value={variation && variation.name}
				/>
				<PanelGroup>
					<Panel
						collapsible
						eventKey="1"
						header="Tunnisteet"
						style={{ cursor: "pointer" }}
					>
						asd
					</Panel>
					<Panel
						collapsible
						eventKey="2"
						header="Laulutietokannat"
						style={{ cursor: "pointer" }}
					>
						qwerty
					</Panel>
				</PanelGroup>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Kieli</ControlLabel>
					<FormControl componentClass="select" placeholder="select">
						<option value="select">suomi</option>
						<option value="other">englanti</option>
					</FormControl>
				</FormGroup>
				<FormGroup
					controlId="formControlsTextarea"
					style={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column"
					}}
				>
					<ControlLabel>Sisältö</ControlLabel>
					<FormControl
						componentClass="textarea"
						placeholder="textarea"
						value={variation && variation.text}
						style={{
							resize: "none",
							flexGrow: 1
						}}
					/>
				</FormGroup>
				<div style={{ display: "inline" }}>
					<Button
						style={{ marginRight: "10px" }}
						onClick={() => {
							if (this.props.onCancel) {
								this.props.onCancel();
							}
						}}
					>
						Peruuta
					</Button>
					<Button bsStyle="danger" style={{ marginRight: "10px" }}>
						Poista
					</Button>
					<Button bsStyle="success" style={{ marginRight: "10px" }}>
						Tallenna
					</Button>
				</div>
			</ResizablePanel>
		);
	}
}

const fetchVariation = gql`
	query fetchVariation($variationId: ID!) {
		variation(variationId: $variationId) {
			id
			name
			text
		}
	}
`;

export default graphql(fetchVariation, {
	options: ownProps => {
		return {
			variables: {
				variationId: ownProps.variationId
			}
		};
	}
})(EditVariation);
