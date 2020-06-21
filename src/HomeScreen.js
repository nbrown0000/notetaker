import React from 'react';
import Collection from "./Collection";
import ActiveList from "./ActiveList";
import "./HomeScreen.css"

const HomeScreen = ({ name, collection, activeList, onCheck, setActiveList }) => {
  return (
    <main className="homescreen">
      <Collection
        name={name}
        collection={collection.map(el => el.title)}
        setActiveList={setActiveList}
      />
      <ActiveList
        onCheck={onCheck}
        activeList={activeList}
      />
    </main>
  )
}

export default HomeScreen;