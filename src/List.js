import React from 'react'
import listIcon from "./icons/list.png";
import deleteIcon from "./icons/garbage.png";

class List extends React.Component {

  render() {
    
    const { item } = this.props;

    return (
      <li
        className="lists__active-item"
        onClick={() => this.props.onListClicked(item)}
      >

        <p className="lists__active-name">
          <img src={listIcon} width="15px" alt="" />
          {item.list.title}
          <img
            onClick={() => this.props.deleteList(item)}
            className="lists__active-delete"
            src={deleteIcon}
            width="15px"
            alt=""
          />
        </p>
        <p className="lists__active-count">{item.count}</p>
        
      </li>
    )
  }
}

export default List;