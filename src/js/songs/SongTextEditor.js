import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

const styles = {
	root: {
		fontFamily: "'Helvetica', sans-serif",
		padding: 20,
		width: 600,
	},
	editor: {
		border: "1px solid #ccc",
		cursor: "text",
		minHeight: 80,
		padding: 10,
	},
	button: {
		marginTop: 10,
		textAlign: "center",
	},
};

export default class SongTextEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
		this.onChange = (editorState) => {
			this.setState({ editorState });
			console.log("editorState", editorState);
		};
		this.logState = () => console.log(this.state.editorState.toJS());
		this.setDomEditorRef = ref => this.domEditor = ref;
	}

	componentDidMount() {
		this.domEditor.focus();
	}

	bold() {
		console.log("bold", this.state.editorState._immutable);
		this.onChange(RichUtils.toggleInlineStyle(
			this.state.editorState,
			"BOLD"
		));
	}

	render() {
		return (
			<div style={styles.root}>
				<div style={styles.editor} onClick={e => this.domEditor.focus()}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						ref={this.setDomEditorRef}
					/>
				</div>
				<button onClick={e => this.bold()}>
				bold
				</button>
			</div>
		);
	}
}