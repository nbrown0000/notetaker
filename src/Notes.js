import React from 'react';
import "./Notes.css";

const Notes = ({ activeList }) => {
  
  // let nameStyle;
  // if(item.isDone === true) {
  //   nameStyle = { textDecoration: "line-through" }
  // } else {
  //   nameStyle = { textDecoration: "none" }
  // }

  return (
    <section className="notes">
      {
      activeList === '' ?
        <>
          No notes found!
        </>
      :
        <ul className="notes__list">
          {activeList.map((note,i) => {
            return (
            <li className="notes__item" key={i}>
              {note.body}
            </li>
            )
          })}
        </ul>
      }
    </section>
    // <li className="activelist__item">
    //   <input
    //     className="activelist__item-checkbox"
    //     type="checkbox"
    //     onClick={() => onCheck(item.name)}
    //     defaultChecked={item.isDone}
    //   />
    //   <span
    //     className="activelist__item-name"
    //     style={nameStyle}
    //   > {item.name} </span>
    // </li>
  )
}

export default Notes;