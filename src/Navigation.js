import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from "./SignupButton";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  const { isAuthenticated, isLoading } = useAuth0();
  const { user } = useAuth0();

  return (
    <Navbar className="color-nav" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/vote">
                Vote Bracket
              </NavLink>
            </li>
          </ul>
        </Nav>
        <Nav>
          {!isLoading && (
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ?
                <li className="nav-item">
                  <NavDropdown align="end" title={user.name} id="basic-nav-dropdown">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><LogoutButton /></NavDropdown.Item>
                  </NavDropdown>
                </li>
                :
                <>
                  <li className="nav-item"><LoginButton /></li>
                  <li className="nav-item"><SignupButton /></li>
                </>}
            </ul>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
