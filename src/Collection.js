import React from 'react'
import calendarIcon from "./icons/011-planner.png";

const Collection = ({ collection, onCollectionClicked }) => {
  return (
    <ul className="main__collection">
      {
      collection === '' ? <></> :
        collection.map((item,i) => {
          return (
            <li
              key={i}
              className="main__collection-item"
              onClick={() => onCollectionClicked(item)}
            >
              <img alt="item" src={calendarIcon} width="15em" />
              {item.name}
            </li>)
        })
      }
      <li>
        <img alt="item" src={calendarIcon} width="15em" />
        Completed
      </li>
    </ul>
  )
}

export default Collection;