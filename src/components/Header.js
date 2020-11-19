import React from 'react';
import "./Header.css"
import logoutIcon from "../icons/logout.png";
import plusIcon from "../icons/056-add.png";
import searchIcon from "../icons/012-search.png";

const Header = ({ window, onClickLogOut }) => {

  return (
    <header className="header">
      <h1 className="header__title">Note<span className="emphasise">Taker</span></h1>
      <nav className="header__nav">
        <img className="header__add" src={plusIcon} alt="add" />
        <img className="header__search" src={searchIcon} alt="add" />
        <p className="header__logout" onClick={onClickLogOut}>
          { window > 480 ? <>Log out</> :
          <img src={logoutIcon} alt="log out" onClick={onClickLogOut} />
          }  
        </p>
      </nav>
      
    </header>
  )
}

export default Header;