import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
	RectBoxInner,
	RectBox
} from "koodinikkarit-ui-kit";

import Button from "react-bootstrap/lib/Button";
import Clearfix from "react-bootstrap/lib/Clearfix";

import FETCH_VARIATIONS from "./fetch_variations.graphql";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.variations ? this.props.variations : [],
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.variations) {
			this.setState({
				items: nextProps.variations
			});
		}
	}

	onDragEnd(result) {
		console.log("result", result);

		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items,
		});
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div ref={provided.innerRef}>
							{this.state.items.map((item, index) => (
								<Draggable key={item.id} draggableId={item.id}>
									{(provided) => (
										<div style={{
											marginTop: "5px",
											marginBottom: "5px",
											cursor: "pointer"
										}}>
											<div
												ref={provided.innerRef}
												style={provided.draggableStyle}
												{...provided.dragHandleProps} >
												<Clearfix>
													{index+1 + ". " + item.name}
													<div style={{
														marginLeft: "5px",
														float: "right"
													}}>
														<Button bsStyle="danger"
															onClick={() => {
																if (this.props.onRemove) {
																	this.props.onRemove(item.id);
																}
															}}>
															Poista
														</Button>
													</div>
													<div style={{
														float: "right"
													}} onClick={() => {
														if (this.props.onShowText) {
															this.props.onShowText(item.id);
														}
													}}>
														<Button bsStyle="info">
															Näytä
														</Button>
													</div>
												</Clearfix>
											</div>
											{provided.placeholder}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

















// class DragItem extends React.Component {
// 	state = {
// 		draggin: false,
// 		clientX: 0,
// 		clientY: 0,
// 		startX: 0,
// 		startY: 0
// 	}

// 	componentDidMount() {
// 		document.addEventListener("mousemove", e => {
// 			this.setState({
// 				clientX: e.clientX,
// 				clientY: e.clientY
// 			});
// 		});

// 		document.addEventListener("mouseup", () => {
// 			this.setState({
// 				draggin: false
// 			});
// 		});
// 	}

// 	render() {
// 		return (
// 			<div onMouseUp={e => {
// 				this.setState({
// 					draggin: false
// 				});

// 				if (this.props.onDragEnd) {
// 					this.props.onDragEnd();
// 				}
// 			}}
// 			onMouseDown={e => {
// 				const element = e.target;
// 				const leftOffset = element.offsetLeft;
// 				const topOffset = element.offsetTop;
// 				this.setState({
// 					draggin: true,
// 					startX: e.clientX-leftOffset,
// 					startY: e.clientY-topOffset
// 				});

// 				if (this.props.onDragStart) {
// 					this.props.onDragStart();
// 				}
// 			}}
// 			style={{
// 				position: this.state.draggin ? "absolute" : "static",
// 				left: this.state.draggin ? this.state.clientX - this.state.startX : 0,
// 				top: this.state.draggin ? this.state.clientY - this.state.startY : 0,
// 				borderBottom: "1px solid #e2e2e2",
// 				paddingTop: "10px",
// 				paddingBottom: "10px",
// 				paddingLeft: "5px",
// 				paddingRight: "5px",
// 				cursor: "move"
// 			}}>
				
// 			</div>
// 		)
// 	}
// }

// export class ScheduleSongs extends React.Component {
// 	state = {
// 		dragItems: [],
// 		dragging: false,
// 		dragItemName: "",
// 		dragItemId: "",
// 		clientX: 0,
// 		clientY: 0,
// 		startX: 0,
// 		startY: 0,
// 		endX: 0,
// 		endY: 0
// 	}

// 	componentDidMount() {
// 		document.addEventListener("mousemove", e => {
// 			this.setState({
// 				clientX: e.clientX,
// 				clientY: e.clientY
// 			});
// 		});

// 		document.addEventListener("mouseup", () => {
// 			this.setState({
// 				dragging: false,
// 				dragItemName: "",
// 				dragItemId: ""
// 			});
// 		});
// 	}

// 	render() {
// 		const yli = this.state.clientY > this.state.endY;
// 		if (this.state.dragging) {
// 			// this.node.props.children.forEach(c => {
// 			// 	console.log("child is ", c);
// 			// });
// 			// const element = document.querySelector(this.node);
// 			// console.log("element", element);
// 		}	
// 		return (
// 			<RectBox ref={node => this.node = node}
// 				style={{
// 					borderBottom: "none",
// 					webkitTouchCallout: "none", /* iOS Safari */
// 					webkitUserSelect: "none", /* Safari */
// 					khtmlUserSelect: "none", /* Konqueror HTML */
// 					mozUserSelect: "none", /* Firefox */
// 					msUserSelect: "none", /* Internet Explorer/Edge */
// 					userSelect: "none" /* Non-prefixed version, currently
// 											  supported by Chrome and Opera */
// 				}}>
// 				{this.props.variations && this.props.variations.map((variation, index) => (
// 					<div key={variation.id}
// 						onMouseDown={e => {
// 							const element = e.target;
// 							const leftOffset = element.offsetLeft;
// 							const topOffset = element.offsetTop;
// 							const startX = e.clientX - leftOffset;
// 							const startY = e.clientY - topOffset;
// 							this.setState({
// 								dragging: true,
// 								startX,
// 								startY,
// 								endX: startX + element.clientWidth,
// 								endY: startY + element.clientHeight,
// 								dragItemName: variation.name,
// 								dragItemId: variation.id
// 							});
// 						}}
// 						style={{
// 							borderBottom: "1px solid #e2e2e2",
// 							paddingTop: "10px",
// 							paddingBottom: "10px",
// 							paddingLeft: "5px",
// 							paddingRight: "5px",
// 							cursor: "move"
// 						}}>
// 						<Clearfix>
// 							{variation.id !== this.state.dragItemId ? (index + 1) + ". " + variation.name : "a"}
						
// 							<div style={{
// 								float: "right"
// 							}}>
// 								<Button bsStyle="danger">
// 									Poista
// 								</Button>
// 							</div>
// 						</Clearfix>
// 					</div>
// 				))}

// 				{this.state.dragging &&
// 					<div style={{
// 						position: "absolute",
// 						left: this.state.clientX - this.state.startX,
// 						top: this.state.clientY - this.state.startY,						
// 						borderBottom: "1px solid #e2e2e2",
// 						paddingTop: "10px",
// 						paddingBottom: "10px",
// 						paddingLeft: "5px",
// 						paddingRight: "5px",
// 						cursor: "move"
// 					}}>
// 						{this.state.dragItemName}
// 					</div>}
// 			</RectBox>
// 		);
// 	}
// }

// <DragItem key={variation.id}
// index={index+1}
// name={variation.name}
// onDragStart={() => {
// 	this.setState({
// 		dragItems: [
// 			...this.state.dragItems,
// 			variation.id
// 		]
// 	});
// }}
// onDragEnd={() => {
// 	this.setState({
// 		dragItems: this.state.dragItems.filter(e => e !== variation.id)
// 	});
// }} />


export default compose(
	graphql(FETCH_VARIATIONS, {
		options: ({
			variationIds
		}) => {
			return {
				variables: {
					params: {
						variationIds
					}
				},
				fetchPolicy: "cache-and-network"
			};
		},
		props: ({
			data: {
				variations
			}
		}) => ({
			variations
		})
	})
)(App);