import React from 'react';
import store from "../store";
import { setUser, setRoute } from "../actions"
import "./Header.css"
import logoutIcon from "../icons/logout.png";
import plusIcon from "../icons/056-add.png";
// import searchIcon from "../icons/012-search.png";


class Header extends React.Component {

  onClickLogOut = () => {
    store.dispatch(setUser(''))
    store.dispatch(setRoute('login'))
  }

  render() {
    const window = store.getState().window;

    return (
    <header className="header">
      
      <h1 className="header__title">Note<span className="emphasise">Taker</span></h1>

      <nav className="header__nav">
        <div className="header__add" onClick={this.props.onClickAddList}>
          { window.width > 480 ? <p>Add List</p> : <></>}
          <img src={plusIcon} alt="add"/>
        </div>
        {/* <div className="header__search">
          { window.width > 480 ? <p>Search Notes</p> : <></>}
          <img src={searchIcon} alt="add" />
        </div> */}
        <div className="header__logout" onClick={this.onClickLogOut}>
          { window.width > 480 ? <p>Log out</p> : <></>}
          <img src={logoutIcon} alt="log out" />
        </div>
      </nav>
      
    </header>
  )
  }
}

export default Header;