import React from "react";
import {
	compose
} from "react-apollo";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
	AppendBottomBig
} from "../styles/Layout.css";

export class LoginPage extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col sm={6} smOffset={3}>
						<form className="form-signin" method="post" action="/login">
							<div className={AppendBottomBig}>
								<h2 className="form-signin-heading">
									Kirjaudu sisään
								</h2>
							</div>
							<div className={AppendBottomBig}>
								<label for="inputEmail" className="sr-only">Email address</label>
								<input type="text" name="username" className="form-control" placeholder="Email address" required="" autofocus="" />
							</div>
							<div className={AppendBottomBig}>
								<label for="inputPassword" className="sr-only">Password</label>
								<input type="password" name="password" className="form-control" placeholder="Password" required="" />
							</div>
							<div className="checkbox">
								<label>
									<input type="checkbox" value="remember-me" /> Remember me
								</label>
							</div>
							<button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default compose(

)(LoginPage);