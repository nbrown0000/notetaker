import React from 'react';
import Collection from "./Collection";
import ActiveList from "./ActiveList";
import "./HomeScreen.css"

const HomeScreen = () => {
  return (
    <main className="homescreen">
      <Collection />
      <ActiveList />
    </main>
  )
}

export default HomeScreen;