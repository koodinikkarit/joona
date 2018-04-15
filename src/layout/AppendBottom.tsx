import * as React from "react";

export const AppendBottom = (props: { children: any }) => (
	<div
		style={{
			marginBottom: "10px"
		}}
	>
		{props.children}
	</div>
);
