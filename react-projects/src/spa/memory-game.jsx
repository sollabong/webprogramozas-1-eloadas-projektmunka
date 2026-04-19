import React, { useState, useEffect } from 'react';
import './spa.css';
const MemoryGame = () => {
  const icons = ['⚛️', '🧬', '🔭', '🔬', '💻', '📚', '🧠', '⚖️'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const shuffled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCards(shuffled);
  }, []);

  const handleClick = (id) => {
    if (flipped.length === 2 || solved.includes(id) || flipped.includes(id))
      return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="memory-container">
      <h3>Tudományos Memória</h3>
      <div className="memory-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}
            onClick={() => handleClick(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id)
              ? card.icon
              : '?'}
          </div>
        ))}
      </div>
      {solved.length === cards.length && (
        <p className="win-msg">Gratulálok, nyertél!</p>
      )}
      <button className="btn" onClick={() => window.location.reload()}>
        Új játék
      </button>
    </div>
  );
};

export default MemoryGame;
