import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import * as routes from '../../constants/routes';
import ErrorMessage from '../Error';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpPage = ({ history, refetch }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    event.preventDefault();
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('token', data.signUp.token);

      await this.props.refetch();

      this.props.history.push(routes.LANDING);
    });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ username, email, password }}
      >
        {(signUp, { data, loading, error }) => (
          <Form onSubmit={event => this.onSubmit(event, signUp)}>
            {error && <ErrorMessage error={error} />}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={username}
                placeholder="Full Name"
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Emai</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                name="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                placeholder="Confirm Password"
                onChange={this.onChange}
              />
            </Form.Group>
            <Button disabled={isInvalid || loading} type="submit">
              Sign Up
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
