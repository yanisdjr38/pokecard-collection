import React, { useEffect, useState } from "react";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import HomeScreen from "./components/HomeScreen";
import Navbar from "./components/NavBar";
import "./styles/HomeScreen.css";
import "./styles/Navbar.css"; // Assure-toi d'importer les styles

export default function App() {
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("pokecards");
    return stored ? JSON.parse(stored) : [];
  });

  const [screen, setScreen] = useState("home"); // "home" | "form" | "collection"

  useEffect(() => {
    localStorage.setItem("pokecards", JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = (card) => {
    setCards([card, ...cards]);
    setScreen("home");
  };

  return (
    <div className="app" style={{ paddingBottom: "80px" }}>
      {screen === "home" && (
        <HomeScreen
          cards={cards}
          onAddClick={() => setScreen("form")}
          onViewCollection={() => setScreen("collection")}
        />
      )}

      {screen === "form" && (
        <div style={{ padding: 20 }}>
          <CardForm onAddCard={handleAddCard} />
        </div>
      )}

      {screen === "collection" && (
        <div style={{ padding: 20 }}>
          <CardList
            cards={cards}
            onDeleteCard={(id) =>
              setCards(cards.filter((card) => card.id !== id))
            }
          />
        </div>
      )}

      {/* 🚀 Navigation */}
      <Navbar onNavigate={setScreen} current={screen} />
    </div>
  );
}
