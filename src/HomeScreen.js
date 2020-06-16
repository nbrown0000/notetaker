import React from 'react';
import Collection from "./Collection";
import ActiveList from "./ActiveList";
import "./HomeScreen.css"

const HomeScreen = ({ username }) => {
  return (
    <main className="homescreen">
      <Collection username={username} />
      <ActiveList />
    </main>
  )
}

export default HomeScreen;