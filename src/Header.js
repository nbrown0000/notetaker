import React from 'react';
import "./Header.css"
import userIcon from "./icons/097-user.png";

const Header = ({ firstname }) => {
  return (
    <header className="header">
      <img className="header__user-image" src={userIcon} alt="User" />
      <h2 className="header__user-name">{firstname}</h2>
      <p className="header__logout">Log out</p>
    </header>
  )
}

export default Header;