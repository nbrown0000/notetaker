import React from 'react';
import "./Nav.css"
import userIcon from "./user_anonymous.jpg";

const Nav = ({ name }) => {
  return (
    <nav className="nav">
      <div className="nav__user">
        <img className="nav__user-image" src={userIcon} alt="User" />
        <h2 className="nav__user-name">{name}</h2>
      </div>
    </nav>
  )
}

export default Nav;