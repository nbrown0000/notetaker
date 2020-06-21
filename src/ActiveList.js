import React from 'react';
import "./ActiveList.css";
import ListItem from "./ListItem";

const ActiveList = ({ activeList, onCheck }) => {
  return (
    <div className="activelist">
      <ul className="activelist__list">
        {
          activeList.list === undefined ?
            <>Loading</>
          :
            activeList.list.map((item,i) => {
              return <ListItem item={item} key={i} onCheck={onCheck} />
            })
        }
      </ul>
    </div>
  )
}

export default ActiveList;