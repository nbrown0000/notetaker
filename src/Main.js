import React from 'react';
import "./Main.css"

const Main = ({ collection }) => {

  return (
    <main className="main">
      <div className="main__heading">
        <h2 className="main__heading-title">Lists</h2>
        <div className="main__heading-add">
          <p className="main__heading-add-symbol">+</p>
          <p className="main__heading-add-text">Add List</p>
        </div>
      </div>
      <ul className="main__list">
        {collection.map((item,i) => {
          return <li className="main__list-item" key={i}>{item}</li>
        })}
      </ul>
    </main>
  )
}

export default Main;