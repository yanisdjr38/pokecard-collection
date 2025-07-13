import React from "react";
import addIcon from "../assets/icons/add.png";
import collectionIcon from "../assets/icons/cards.png";
import homeIcon from "../assets/icons/home.svg";
import "../styles/Navbar.css";

export default function Navbar({ onNavigate, current }) {
  return (
    <nav className="bottom-navbar">
      <button
        className={current === "home" ? "active" : ""}
        onClick={() => onNavigate("home")}
      >
        <img src={homeIcon} alt="Home" />
      </button>
      <button
        className={current === "collection" ? "active" : ""}
        onClick={() => onNavigate("collection")}
      >
        <img src={collectionIcon} alt="Collection" />
      </button>
      <button
        className={current === "form" ? "active" : ""}
        onClick={() => onNavigate("form")}
      >
        <img src={addIcon} alt="Add" />
      </button>
    </nav>
  );
}
