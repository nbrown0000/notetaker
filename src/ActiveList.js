import React from "react";
import "./ActiveList.css";
import backIcon from "./icons/152-left-arrow.png";
import saveIcon from "./icons/034-diskette.png";

const ActiveList = ({ activeTitle, activeList, onClickActiveListItem }) => {

  return (
    <section className="activelist">
      
      <header className="activelist__header">
        <h2 className="activelist__header-title">{activeTitle}</h2>
        <img className="activelist__header-saveIcon" src={backIcon} alt="back" />
        <img className="activelist__header-backIcon" src={saveIcon} alt="save" />
      </header>

      <ul className="activelist__list">
        {activeList.length === 0 ?
          <></>
        :
          activeList.map((item,i) => {
            return (
              <li
                key={i}
                className="activelist__list-item"
                onClick={() => onClickActiveListItem(item.id)}
              >
                {item.name}
              </li>)
          })
        }
      </ul>
    </section>
  )
}

export default ActiveList