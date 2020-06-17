import React from 'react';

const ListItem = ({ item, onCheck }) => {

  //TODO: Styling based on isDone attribute
  
  let nameStyle;
  if(item.isDone === true) {
    nameStyle = { textDecoration: "line-through" }
  } else {
    nameStyle = { textDecoration: "none" }
  }

  return (
    <li className="activelist__item">
      <input
        className="activelist__item-checkbox"
        type="checkbox"
        onClick={() => onCheck(item.name)}
        defaultChecked={item.isDone}
      />
      <span className="activelist__item-name" style={nameStyle}> {item.name} </span>
    </li>
  )
}

export default ListItem;