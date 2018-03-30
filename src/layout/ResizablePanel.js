import React, { Component } from "react";

export default class ResizablePanel extends React.Component {
	render() {
		return (
			<div
				className="panel panel-default"
				style={{
					resize: "both",
					overflow: "auto",
					display: "flex",
					flexDirection: "column"
				}}
			>
				<div className="panel-heading">{this.props.header}</div>
				<div
					className="panel-body"
					style={{
						flexGrow: 1,
						display: "flex",
						flexDirection: "column"
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}
