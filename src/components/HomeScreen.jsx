import React from "react";
import newsimg from "../assets/assetsnews.jpg";
import logo from "../assets/logo.png";
import "../styles/HomeScreen.css";

export default function HomeScreen({ cards, onAddClick, onViewCollection }) {
  const latestCards = cards.slice(0, 3);

  return (
    <div className="home-container">
      <header className="home-header">
        <img className="logo" src={logo} alt="logo" />
      </header>
      <div className="container-card">
        <section className="card-preview">
          <h2>Recently Added</h2>
          <div className="card-row">
            {latestCards.length === 0 ? (
              <p>No cards added yet.</p>
            ) : (
              latestCards.map((card) => (
                <div key={card.id} className="card-box">
                  <img src={card.image} alt={card.name} />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="home-actions">
          <button className="btn-primary" onClick={onAddClick}>
            + Add Card
          </button>
          <button className="btn-secondary" onClick={onViewCollection}>
            View Collection
          </button>
        </section>
      </div>

      <div className="container-news">
        <section className="news-section">
          <h2>Pokecard News</h2>
          <div className="news-box">
            <img src={newsimg} alt="news" />
            <p>
              Pokémon TCG: Mega Evolution Trailer
              <button className="btn-secondary">
                {" "}
                <a href="https://youtu.be/Q-mYDnb9cWA"></a> Here!{" "}
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
