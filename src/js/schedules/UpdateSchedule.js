import React from "react";
import {
	compose,
	graphql
} from "react-apollo";

import { DragDropContext } from "react-beautiful-dnd";

import {
	Link
} from "react-router-dom";

import {
	RectBoxInner,
	AppendBottom,
	AppendRight
} from "koodinikkarit-ui-kit";

import FormControl from "react-bootstrap/lib/FormControl";

import Button from "react-bootstrap/lib/Button";

import FETCH_SCHEDULE from "./fetch_schedule.graphql";
import UPDATE_SCHEDULE from "./update_schedule.graphql";
import REMOVE_SCHEDULE from "./remove_schedule.graphql";

import SongSearch from "../songs/SongSearch";

import ScheduleSongs from "./ScheduleSongs";

export class UpdateSchedule extends React.Component {
	state = {
		name: this.props.schedule ? this.props.schedule.name : "",
		addSongIds: [],
		removeSongIds: [],
		addSongsMode: false
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.schedule) {
			this.setState({
				name: nextProps.schedule.name,
				addSongIds: [],
				removeSongIds: []
			});
		}
	}

	render() {
		return (
			<RectBoxInner>
				<AppendBottom>
					<label>
						Nimi
					</label>
					<FormControl type="text"
						value={this.state.name}
						onChange={e => {
							this.setState({
								name: e.target.value
							});
						}} />
				</AppendBottom>
				<AppendBottom>
					{this.state.addSongsMode ?
						<div>
							<AppendBottom>
								<label>
									Laulut
								</label>
								<SongSearch
									maxHeight="300px"
									skipVariationIds={[
										...this.state.addSongIds,
										...this.props.schedule.variations.
											map(p => p.id).filter(e => !this.state.removeSongIds.includes(e))
									]}
									onItemClick={id => {
										if (this.state.removeSongIds.includes(id)) {
											this.setState({
												removeSongIds: this.state.removeSongIds.filter(e => e !== id)
											});
										} else {
											this.setState({
												addSongIds: [
													...this.state.addSongIds,
													id
												]
											});
										}
									}} />
							</AppendBottom>
							<Button onClick={() => {
								this.setState({
									addSongsMode: false
								});
							}}>
								Valmis
							</Button>
						</div> :
						<Button onClick={() => {
							this.setState({
								addSongsMode: true
							});
						}}>
							Lisää lauluja
						</Button>}
				</AppendBottom>
				<AppendBottom>
					{this.props.schedule &&
					<ScheduleSongs
						onShowText={id => {
							console.log("Show text", id);
						}}
						onRemove={id => {
							if (this.state.addSongIds.includes(id)) {
								this.setState({
									addSongIds: this.state.addSongIds.filter(e => e !== id)
								})
							} else {
								this.setState({
									removeSongIds: [
										...this.state.removeSongIds,
										id
									]
								});
							}
						}}
						variationIds={[
							...this.state.addSongIds,
							...this.props.schedule.variations.
								map(p => p.id).
								filter(e => !this.state.removeSongIds.includes(e))
						]} />}
				</AppendBottom>
				<AppendRight>
					<Link to={this.props.getCancelLinkPath ? this.props.getCancelLinkPath() : ""}>
						<Button>
							Peruuta
						</Button>
					</Link>
				</AppendRight>
				<AppendRight>
					<Button bsStyle="danger"
						onClick={() => {
							this.props.removeSchedule(this.props.schedule.id).then(() => {
								if (this.props.onRemove) {
									this.props.onRemove();
								}
							});
						}}>
						Poista
					</Button>
				</AppendRight>
				<Button bsStyle="success"
					onClick={() => {
						this.props.updateSchedule({
							scheduleId: this.props.schedule.id,
							name: this.state.name,
							addSongIds: this.state.addSongIds,
							removeSongIds: this.state.removeSongIds
						}).then(() => {
							if (this.props.onSave) {
								this.props.onSave();
							}
						});
					}}>
					Tallenna
				</Button>
			</RectBoxInner>
		);
	}
}

export default compose(
	graphql(FETCH_SCHEDULE, {
		options: ({
			scheduleId
		}) => {
			return {
				variables: {
					scheduleId
				}
			};
		},
		props: ({
			data: {
				schedule
			}
		}) => ({
			schedule
		})
	}),
	graphql(UPDATE_SCHEDULE, {
		props: ({ mutate }) => ({
			updateSchedule: (params) => mutate({
				variables: {
					params
				}
			})
		})
	}),
	graphql(REMOVE_SCHEDULE, {
		props: ({ mutate }) => ({
			removeSchedule: (scheduleId) => mutate({
				variables: {
					params: {
						scheduleId
					}
				}
			})
		})
	})
)(UpdateSchedule);