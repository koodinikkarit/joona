import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class Variations extends Component {
	render() {
		console.log("this", this);
		const variations = this.props.data.allVariations
			? this.props.data.allVariations.variations
			: [];
		return (
			<div>
				{variations.map(p => (
					<div>
						{p.id}:{p.name}
					</div>
				))}
			</div>
		);
	}
}

const allVariations = gql`
	query allVariations {
		allVariations: searchVariations {
			variations {
				id
				name
				text
			}
		}
	}
`;

export default graphql(allVariations)(Variations);
