import "../assets/styles/navbar.css";

import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ items }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleBtn = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <button
        className={`toggle-btn fade-in ${isMenuActive ? "active" : ""}`}
        onClick={toggleBtn}
      >
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </button>
      <nav className={`navbar fade-in ${isMenuActive ? "clip" : ""}`}>
        <ul className={`navbar-menu ${isMenuActive ? "fade-in-menu" : ""}`}>
          {items.map((item, index) => (
            <li key={index} className="navbar-item">
              <div className="button-container">
                <NavLink
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? "active-item" : ""}`
                  }
                  to={item.url}
                  onClick={() => setIsMenuActive(false)}
                >
                  {item.item}
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
