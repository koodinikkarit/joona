import * as React from "react";

import {
	FormControl,
	Col,
	Form,
	FormGroup,
	ControlLabel,
	Panel,
	Checkbox,
	Button
} from "react-bootstrap";
import { graphql, ChildProps, MutationResult } from "react-apollo";
import { USER_LOGIN_MUTATION } from "../servergql";
import { loginMutationVariables, loginMutation } from "../types";

type InputProps = {};

interface IResponseProps {}

interface ILoginFormProps extends ChildProps<InputProps, IResponseProps> {
	login: (
		args: { variables: loginMutationVariables }
	) => Promise<MutationResult<loginMutation>>;
}

const withUserLogin = graphql<
	InputProps,
	IResponseProps,
	loginMutationVariables,
	ChildProps<InputProps, IResponseProps>
>(USER_LOGIN_MUTATION, {
	name: "login"
});

export const LoginForm = withUserLogin(
	class extends React.Component<ILoginFormProps> {
		state = {
			username: "",
			password: "",
			rememberMe: false
		};

		render() {
			return (
				<Panel>
					<Panel.Heading>Kirjaudu sisään</Panel.Heading>
					<Panel.Body>
						<Form horizontal={true}>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									Käyttäjänimi
								</Col>
								<Col sm={10}>
									<FormControl
										type="text"
										placeholder="Käyttäjänimi"
										value={this.state.username}
										onChange={e => {
											const target = e.target as HTMLInputElement;
											this.setState({
												username: target.value
											});
										}}
									/>
								</Col>
							</FormGroup>
							<FormGroup>
								<Col componentClass={ControlLabel} sm={2}>
									Salasana
								</Col>
								<Col sm={10}>
									<FormControl
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
							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Checkbox
										checked={this.state.rememberMe}
										onChange={() => {
											this.setState({
												rememberMe: !this.state
													.rememberMe
											});
										}}
									>
										Muista minut
									</Checkbox>
								</Col>
							</FormGroup>

							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button
										type="submit"
										onClick={e => {
											e.preventDefault();
											this.props.login({
												variables: {
													username: this.state
														.username,
													password: this.state
														.password,
													rememberMe: this.state
														.rememberMe
												}
											});
										}}
									>
										Kirjaudu
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Panel.Body>
				</Panel>
			);
		}
	}
);
