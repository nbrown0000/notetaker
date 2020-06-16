import React from 'react';
import "./Collection.css";
import userIcon from "./user_anonymous.jpg";

const Collection = ({ username }) => {
  return (
    <div className="collection">
      <div className="collection__header">
        <img src={userIcon} width={80} />
        <h2 className="collection__header-title">{username}</h2>
      </div>
    </div>
  )
}

// <a href="https://www.vecteezy.com/free-vector/profile">Profile Vectors by Vecteezy</a>

export default Collection;