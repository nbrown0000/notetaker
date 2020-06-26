import React from 'react';
import "./Nav.css"

const Nav = () => {
  const x = 7
  return (
    <nav className="nav">
      <section className="nav__innercontainer">
        <select className="nav__timeselection" name="time">
          <option value="today">Today</option>
          <option value="today">Tomorrow</option>
          <option value="today">Next 7 Days</option>
          <option value="today">All Upcoming</option>
        </select>

        <span>{x}</span>
      </section>
    </nav>
  )
}

export default Nav;