import React, { useState } from "react";
import "../styles/CardList.css";

const SET_OPTIONS = [
  { id: "sv1", name: "Scarlet & Violet" },
  { id: "swsh12", name: "Silver Tempest" },
  { id: "swsh11", name: "Lost Origin" },
  { id: "swsh10", name: "Astral Radiance" },
  { id: "swsh9", name: "Brilliant Stars" },
  { id: "swsh7", name: "Evolving Skies" },
  { id: "swsh5", name: "Battle Styles" },
  { id: "swsh4", name: "Vivid Voltage" },
  { id: "swsh2", name: "Rebel Clash" },
  { id: "swsh1", name: "Sword & Shield" },
  { id: "sm12", name: "Cosmic Eclipse" },
  { id: "sm11", name: "Unified Minds" },
  { id: "xy12", name: "Evolutions" },
  { id: "bw1", name: "Black & White" },
  { id: "base1", name: "Base Set" },
];

export default function CardList({ cards, onDeleteCard }) {
  const [search, setSearch] = useState("");
  const [setFilter, setSetFilter] = useState("");

  const filteredCards = cards
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()))
    .filter((card) =>
      setFilter
        ? card.set.toLowerCase().includes(setFilter.toLowerCase())
        : true
    )
    .sort((a, b) => a.set.localeCompare(b.set));

  const groupedBySet = filteredCards.reduce((acc, card) => {
    acc[card.set] = acc[card.set] || [];
    acc[card.set].push(card);
    return acc;
  }, {});

  return (
    <div className="card-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={setFilter}
          onChange={(e) => setSetFilter(e.target.value)}
        >
          <option value="">All sets</option>
          {SET_OPTIONS.map((set) => (
            <option key={set.id} value={set.name}>
              {set.name}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(groupedBySet).map(([setName, cardsInSet]) => (
        <div key={setName} className="card-set">
          <h3>{setName}</h3>
          <div className="card-grid">
            {cardsInSet.map((card) => (
              <div key={card.id} className="card-item">
                <img
                  src={card.image}
                  alt={card.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150x210?text=No+Image";
                  }}
                />
                <p className="card-name">{card.name}</p>
                <p style={{ fontSize: "0.8rem", color: "#777" }}>
                  {card.rarity}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => onDeleteCard(card.id)}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filteredCards.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>No cards found.</p>
      )}
    </div>
  );
}
