import React from 'react';
import "./ActiveList.css";
import ListItem from "./ListItem";

const ActiveList = ({ activeList, onCheck }) => {
  return (
    <section className="activelist">
      <ul className="activelist__list">
        {
          activeList === undefined ?
            <p className="activelist__loading">Loading</p>
          :
            activeList.map((item,i) => {
              return <ListItem item={item} key={i} onCheck={onCheck} />
            })
        }
      </ul>
    </section>
  )
}

export default ActiveList;