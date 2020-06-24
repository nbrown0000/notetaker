import React from 'react';
import "./Header.css"
import userIcon from "./user_anonymous.jpg";

const Header = ({ name }) => {
  return (
    <header className="header">
      <div className="header__user">
        <img className="header__user-image" src={userIcon} alt="User" />
        <h2 className="header__user-name">{name}</h2>
      </div>
    </header>
  )
}

export default Header;