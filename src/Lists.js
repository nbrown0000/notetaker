import React from 'react'
import "./Lists.css";

const Lists = ({ lists, onListClicked }) => {
  return (
    <section className="lists">
    <ul className="lists__active">
      {
      lists === '' ? <>No notes</> :
      lists.map((item,i) => {
          return (
            <li
              key={i}
              className="lists__active-item"
              onClick={() => onListClicked(item)}
            >
              <p>{item.title}</p>
              <p>10</p>
            </li>)
        })
      }
      {/* <li>
        <img alt="item" src={calendarIcon} width="15em" />
        Completed
      </li> */}
    </ul>
    </section>
  )
}

export default Lists;