import React from 'react';
import "./Collection.css";

const Collection = ({ name, collection, setActiveList }) => {
  return (
    <section className="collection">
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
    </section>
  )
}

// <a href="https://www.vecteezy.com/free-vector/profile">Profile Vectors by Vecteezy</a>

export default Collection;