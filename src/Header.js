import React from 'react';
import "./Header.css"
import userIcon from "./icons/avatar.png";

const Header = ({ user, onClickLogOut }) => {

  return (
    <header className="header">
      <img className="header__user-image" src={userIcon} alt="User" />
      <h2 className="header__user-name">{user.username}</h2>
      <p className="header__logout" onClick={onClickLogOut}>Log out</p>
    </header>
  )
}

export default Header;