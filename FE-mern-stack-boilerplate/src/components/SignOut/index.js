import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

import Button from 'react-bootstrap/Button';

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <Button onClick={() => signOut(client)}>Sign Out</Button>
    )}
  </ApolloConsumer>
);

const signOut = client => {
  localStorage.removeItem('token');
  client.resetStore();
  history.push(routes.SIGN_IN);
};

export { signOut };

export default SignOutButton;
