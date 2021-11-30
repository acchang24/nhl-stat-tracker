import React from "react";
import { NavLink } from "react-router-dom";

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul className="nav">
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
            <NavLink exact className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
