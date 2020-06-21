import React from 'react';
import "./Collection.css";
import userIcon from "./user_anonymous.jpg";

const Collection = ({ name, collection, setActiveList }) => {
  return (
    <div className="collection">
      <div className="collection__header">
        <img src={userIcon} alt="User" width={80} />
        <h2 className="collection__header-title">{name}</h2>
        <ul className="collection__list">
          {collection.map((el,i) => {

            return <li
              key={i}
              className="collection__item"
              onClick={() => setActiveList(el)}
            >
              {el}
            </li>

          })}
        </ul>
      </div>
    </div>
  )
}

// <a href="https://www.vecteezy.com/free-vector/profile">Profile Vectors by Vecteezy</a>

export default Collection;