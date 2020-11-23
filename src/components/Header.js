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
        <div className="header__add">
          { window.width > 480 ? <p>Add Note</p> : <></>}
          <img src={plusIcon} alt="add" />
        </div>
        <div className="header__search">
          { window.width > 480 ? <p>Search Notes</p> : <></>}
          <img src={searchIcon} alt="add" />
        </div>
        <div className="header__logout" onClick={onClickLogOut}>
          { window.width > 480 ? <p>Log out</p> : <></>}
          <img src={logoutIcon} alt="log out" onClick={onClickLogOut} />
        </div>
      </nav>
      
    </header>
  )
}

export default Header;