import React from 'react';
import { setUser, setRoute, addList, getNotes, setIsNewList } from "../actions"
import "./Header.css"
import { connect } from "react-redux";
import logoutIcon from "../icons/logout.png";
import plusIcon from "../icons/056-add.png";
// import searchIcon from "../icons/012-search.png";

const mapStateToProps = state => {
  return {
    user: state.user,
    lists: state.lists,
    window: state.window
  };
}

const mapDispatchToProps = {
  setUser, setRoute, addList, getNotes, setIsNewList
}

function ConnectedHeader(props) {

  const onClickLogOut = () => {
    props.setUser('')
    props.setRoute('login')
  }

  const onClickAddList = async () => {
    // add list
    await props.setIsNewList(true);
    await props.addList(props.user.user_id, "")
    
    // get notes for new list
    // if(props.lists) {
    //   props.getNotes(props.lists[props.lists.length - 1].list_id)
    // }
  }

    const { window } = props;

    return (
    <header className="header">
      
      <h1 className="header__title">Note<span className="emphasise">Taker</span></h1>

      <nav className="header__nav">
        <div className="header__add" onClick={onClickAddList}>
          { window.width > 480 ? <p>Add List</p> : <></>}
          <img src={plusIcon} alt="add"/>
        </div>
        {/* <div className="header__search">
          { window.width > 480 ? <p>Search Notes</p> : <></>}
          <img src={searchIcon} alt="add" />
        </div> */}
        <div className="header__logout" onClick={onClickLogOut}>
          { window.width > 480 ? <p>Log out</p> : <></>}
          <img src={logoutIcon} alt="log out" />
        </div>
      </nav>
      
    </header>
  )
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);

export default Header;