export const saveToLocalStorage = (cards) => {
  localStorage.setItem("pokemonCards", JSON.stringify(cards));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem("pokemonCards");
  return data ? JSON.parse(data) : [];
};
