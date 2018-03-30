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

export class LoginPage extends React.Component {
	state = {
		userName: "",
		password: ""
	};

	render() {
		return (
			<Grid fluid={false}>
				<Panel>
					<Panel.Heading>Kirjaudu sisään</Panel.Heading>
					<Panel.Body>
						<Form horizontal={true} method="POST">
							<FormGroup>
								<Col sm={2} componentClass={ControlLabel}>
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
								<Col sm={2} componentClass={ControlLabel}>
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
							<FormGroup>
								<Col smOffset={2} sm={10}>
									<Button type="submit">
										Kirjaudu sisään
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Panel.Body>
				</Panel>
			</Grid>
		);
	}
}
