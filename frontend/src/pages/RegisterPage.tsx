import * as React from "react";
import {
	Panel,
	Grid,
	Form,
	FormControl,
	Col,
	FormGroup,
	ControlLabel,
	Button
} from "react-bootstrap";
import { graphql, compose, ChildProps } from "react-apollo";
import { PAGE_VIEWER_QUERY } from "../servergql";
import { CREATE_USER_MUTATION } from "../servergql/user";
import { getPageViewerQuery, registerUserMutationVariables } from "../types";

interface IResponseProps extends ChildProps<{}, getPageViewerQuery> {
	registerUser: (
		props: registerUserMutationVariables
	) => Promise<{
		success: boolean;
		userNameAlreadyInUse: boolean;
	}>;
}

const withPageViewer = graphql(PAGE_VIEWER_QUERY);
// const wtihRegisterUser = graphql(CREATE_USER_MUTATION, {
// 	name: "registerUser"
// });

const wtihRegisterUser = graphql(CREATE_USER_MUTATION, {
	props: ({ mutate }) => ({
		registerUser: props2 =>
			mutate({
				variables: props2
			})
	})
});

export const RegisterPage = compose(withPageViewer, wtihRegisterUser)(
	class extends React.Component<IResponseProps> {
		state = {
			userName: "",
			password: "",
			registeringUser: false,
			userNameAlreadyInUse: false
		};

		render() {
			if (this.props.data.loading) {
				return <div />;
			}

			if (this.props.data.error) {
				return <div />;
			}

			console.log("props", this.props);

			return (
				<Grid fluid={false}>
					<Panel>
						<Panel.Heading>Rekistöröidy</Panel.Heading>
						<Panel.Body>
							{!this.state.registeringUser ? (
								<Form horizontal={true} method="POST">
									<FormGroup
										validationState={
											this.state.userNameAlreadyInUse
												? "error"
												: null
										}
									>
										<Col
											sm={2}
											componentClass={ControlLabel}
										>
											Käyttäjänimi
										</Col>
										<Col sm={8}>
											<FormControl
												name="userName"
												type="text"
												placeholder="Käyttäjänimi"
												value={this.state.userName}
												onChange={e => {
													const target = e.target as HTMLInputElement;
													this.setState({
														userName: target.value
													});
												}}
											/>
										</Col>
									</FormGroup>
									<FormGroup>
										<Col
											sm={2}
											componentClass={ControlLabel}
										>
											Salasana
										</Col>
										<Col sm={8}>
											<FormControl
												name="password"
												type="password"
												placeholder="Salasana"
												value={this.state.password}
												onChange={e => {
													const target = e.target as HTMLInputElement;
													this.setState({
														password: target.value
													});
												}}
											/>
										</Col>
									</FormGroup>
									<FormGroup validationState="error">
										{this.state.userNameAlreadyInUse && (
											<Col
												smOffset={2}
												componentClass={ControlLabel}
											>
												Käyttäjänimi on jo käytössä
											</Col>
										)}
									</FormGroup>
									<FormGroup>
										<Col smOffset={2} sm={10}>
											<Button
												type="submit"
												onClick={e => {
													e.preventDefault();
													this.setState({
														registeringUser: true
													});

													this.props
														.registerUser({
															userName: this.state
																.userName,
															password: this.state
																.password,
															admin: !this.props
																.data.viewer
																.adminInitialized
														})
														.then(response => {
															this.setState({
																registeringUser: false,
																userNameAlreadyInUse:
																	response.userNameAlreadyInUse
															});
														});
												}}
											>
												Rekistöröidy
											</Button>
										</Col>
									</FormGroup>
								</Form>
							) : (
								<div>Rekistöröidään</div>
							)}
						</Panel.Body>
					</Panel>
				</Grid>
			);
		}
	}
);
