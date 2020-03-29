import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import withSession from '../Session/withSession';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.css';

import * as routes from '../../constants/routes';
import history from '../../constants/history';

const App = ({ session, refetch }) => (
  <Router history={history}>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to={'/login'} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>
            <Navigation session={session} />
          </Container>
        </Navbar>
      </header>
      <Container>
        <Route
          exact
          path={routes.LANDING}
          component={() => <LandingPage />}
        />
        <Route
          exact
          path={routes.SIGN_UP}
          component={() => <SignUpPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          component={() => <SignInPage refetch={refetch} />}
        />
        <Route
          exact
          path={routes.ACCOUNT}
          component={() => <AccountPage />}
        />
        <Route
          exact
          path={routes.ADMIN}
          component={() => <AdminPage />}
        />
      </Container>
    </div>
  </Router>
);

export default withSession(App);
