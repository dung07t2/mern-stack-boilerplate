import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';
import Nav from 'react-bootstrap/Nav';

const Navigation = ({ session }) => (
  <div>
    {session && session.me ? (
      <NavigationAuth session={session} />
    ) : (
      <NavigationNonAuth />
    )}
  </div>
);

const NavigationAuth = ({ session }) => (
  <Nav className="justify-content-end">
    <Nav>
      <Link to={routes.LANDING} className="nav-link">
        Landing
      </Link>
    </Nav>
    <Nav>
      <Link to={routes.ACCOUNT} className="nav-link">
        ({session.me.username})
        {session && session.me && session.me.role === 'ADMIN' && (
          <Nav>
            <Link to={routes.ADMIN}>Admin</Link>
          </Nav>
        )}
      </Link>
    </Nav>
    <Nav>
      <SignOutButton />
    </Nav>
  </Nav>
  // <ul>
  //   <li>
  //     <Link to={routes.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={routes.ACCOUNT}>Account ({session.me.username})</Link>
  //   </li>
  //   {session &&
  //     session.me &&
  //     session.me.role === 'ADMIN' && (
  //       <li>
  //         <Link to={routes.ADMIN}>Admin</Link>
  //       </li>
  //     )}
  //   <li>
  //     <SignOutButton />
  //   </li>
  // </ul>
);

const NavigationNonAuth = () => (
  <Nav className="justify-content-end">
    <Nav>
      <Link to={routes.SIGN_IN} className="nav-link">
        Sign In
      </Link>
    </Nav>
    <Nav>
      <Link to={routes.LANDING} className="nav-link">
        Landing
      </Link>
    </Nav>
  </Nav>
);

export default Navigation;
