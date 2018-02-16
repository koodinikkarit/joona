import * as React from "react";

type InputProps = {
	header?: any;
	children?: any;
	className?: string;
};

export const ResizablePanel = (props: InputProps) => {
	return (
		<div
			className={
				"panel panel-default" +
				(props.className ? " " + props.className : "")
			}
			style={{
				resize: "both",
				overflow: "auto",
				display: "flex",
				flexDirection: "column",
				overflowX: "hidden",
				overflowY: "hidden"
			}}
		>
			{props.header && (
				<div className="panel-heading">{props.header}</div>
			)}

			<div
				className="panel-body"
				style={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column"
				}}
			>
				{props.children}
			</div>
		</div>
	);
};
