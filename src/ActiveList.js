import React from 'react';
import "./ActiveList.css";
import ListItem from "./ListItem";

const ActiveList = ({ activeList, onCheck }) => {
  return (
    <div className="activelist">
      <h2 className="activelist__header">{activeList.name}</h2>
      <ul className="activelist__list">
        {
          activeList.list.map((item,i) => {
            return <ListItem item={item} key={i} onCheck={onCheck} />
          })
        }
      </ul>
    </div>
  )
}

export default ActiveList;