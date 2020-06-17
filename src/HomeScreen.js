import React from 'react';
import Collection from "./Collection";
import ActiveList from "./ActiveList";
import "./HomeScreen.css"

const HomeScreen = ({ username, activeList, onCheck }) => {
  return (
    <main className="homescreen">
      <Collection username={username} />
      <ActiveList onCheck={onCheck} activeList={activeList} />
    </main>
  )
}

export default HomeScreen;