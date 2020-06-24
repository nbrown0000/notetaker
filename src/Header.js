import React from 'react';
import "./Header.css"
import userIcon from "./user_anonymous.jpg";

const Header = ({ name }) => {
  return (
    <header className="nav">
      <div className="nav__user">
        <img className="nav__user-image" src={userIcon} alt="User" />
        <h2 className="nav__user-name">{name}</h2>
      </div>
    </header>
  )
}

export default Header;