import React, { useState } from 'react';
import "./DropdownMenu.css";
import dotsIcon from "../icons/show-more-button-with-three-dots.png";

const DropdownMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <img src={dotsIcon} alt="Dotsmenu" />
      </button>
      <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <li><button>Delete List</button></li>
      </nav>
    </div>
  )
}

export default DropdownMenu;