import React, { useState } from 'react';
import { connect } from "react-redux";
import "./DropdownMenu.css";
import dotsIcon from "../icons/show-more-button-with-three-dots.png";
import { deleteList, getNotes } from "../actions/index";

const mapPropsToState = state => {
  return {
    user: state.user,
    lists: state.lists,
    notesListId: state.notesListId
  }
}

const mapDispatchToProps = {
  deleteList, getNotes
}

const ConnectedDropdownMenu = (props) => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const jumpToListAbove = () => {
    const curIndex = props.lists.findIndex(x => x.list_id === props.notesListId)
    const newListId = curIndex > 0 ? props.lists[curIndex-1].list_id : props.lists[0].list_id
    props.getNotes(newListId)
  }

  const onClickDeleteList = () => {
    setIsActive(false)
    props.deleteList(props.notesListId, props.user.user_id)
    jumpToListAbove()
  }

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <img src={dotsIcon} alt="Dotsmenu" />
      </button>
      <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <li><button onClick={onClickDeleteList}>Delete List</button></li>
      </nav>
    </div>
  )
}

const DropdownMenu = connect(
  mapPropsToState,
  mapDispatchToProps
)(ConnectedDropdownMenu);

export default DropdownMenu;