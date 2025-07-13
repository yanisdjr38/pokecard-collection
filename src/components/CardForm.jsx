import { useEffect, useState } from "react";
import "../styles/CardForm.css";

const API_KEY = "4def4ffe-5ab4-45fc-81fd-f713e8a23f93";

export default function CardForm({ onAddCard }) {
  const [name, setName] = useState("");
  const [setId, setSetId] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const knownSets = [
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

  useEffect(() => {
    const fetchCards = async () => {
      if (name.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const query = `name:${encodeURIComponent(name)}${
          setId ? ` set.id:${setId}` : ""
        }`;
        const url = `https://api.pokemontcg.io/v2/cards?q=${query}&pageSize=20`;

        const res = await fetch(url, {
          headers: { "X-Api-Key": API_KEY },
        });

        const data = await res.json();
        setResults(data.data);
      } catch (err) {
        console.error("API error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchCards, 500);
    return () => clearTimeout(timeout);
  }, [name, setId]);

  const handleCardSelect = (card) => {
    setSelectedCard({
      name: card.name,
      set: `${card.set.name} (${card.set.id.toUpperCase()})`,
      rarity: card.rarity || "Unknown",
      image: card.images.large,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCard) {
      alert("Please select a card from the gallery.");
      return;
    }

    const newCard = { id: Date.now(), ...selectedCard };
    onAddCard(newCard);
    setName("");
    setSetId("");
    setSelectedCard(null);
    setResults([]);
  };

  return (
    <div className="card-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card name (e.g. Zekrom)"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSelectedCard(null);
          }}
        />

        <select value={setId} onChange={(e) => setSetId(e.target.value)}>
          <option value="">All official sets</option>
          {knownSets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.id.toUpperCase()})
            </option>
          ))}
        </select>

        {loading && <p>🔄 Searching...</p>}

        {results.length > 0 && !selectedCard && (
          <div className="card-gallery">
            {results.map((card) => (
              <img
                key={card.id}
                src={card.images.small}
                alt={card.name}
                onClick={() => handleCardSelect(card)}
                className={card.set.id === setId ? "selected" : ""}
              />
            ))}
          </div>
        )}

        {selectedCard && (
          <div className="selected-preview">
            <p>
              <strong>Name:</strong> {selectedCard.name}
            </p>
            <p>
              <strong>Set:</strong> {selectedCard.set}
            </p>
            <p>
              <strong>Rarity:</strong> {selectedCard.rarity}
            </p>
            <img src={selectedCard.image} alt="Selected card" />
          </div>
        )}

        <button type="submit">Add to collection</button>
      </form>
    </div>
  );
}
