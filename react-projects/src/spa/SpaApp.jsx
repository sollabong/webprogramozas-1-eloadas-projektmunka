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

const LuckyWheel = () => {
  const sectors = [
    'Fizika',
    'Kémia',
    'Matek',
    'Biosz',
    'Informatika',
    'Történelem',
  ];
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (spinning) return;

    const extraRotation = 1800 + Math.random() * 360;
    const newRotation = rotation + extraRotation;

    setRotation(newRotation);
    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      setSpinning(false);

      const actualDeg = newRotation % 360;

      const sectorAngle = 360 / sectors.length;

      let index = Math.floor((360 - actualDeg) / sectorAngle);

      const finalIndex = (index - 2 + sectors.length) % sectors.length;

      setResult(sectors[finalIndex]);
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <h3>Tudomány-kerék</h3>
      <div className="wheel-wrapper">
        <div className="wheel-pointer">▼</div>
        <div
          className="wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s cubic-bezier(0.1, 0, 0.2, 1)',
          }}
        >
          {sectors.map((s, i) => (
            <div
              key={i}
              className="sector"
              style={{ '--i': i, '--total': sectors.length }}
            >
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn" onClick={spinWheel} disabled={spinning}>
        Pörgetés!
      </button>
      {result && (
        <div className="result-box">
          A választott terület: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
};

const SpaApp = () => {
  const [activeTab, setActiveTab] = useState('memory');

  return (
    <section>
      <div className="container">
        <h2>SPA Játékok - React Interaktivitás</h2>
        <div className="spa-nav">
          <button
            className={`btn ${activeTab === 'memory' ? '' : 'btn-outline'}`}
            onClick={() => setActiveTab('memory')}
          >
            Memória Játék
          </button>
          <button
            className={`btn ${activeTab === 'wheel' ? '' : 'btn-outline'}`}
            onClick={() => setActiveTab('wheel')}
          >
            Szerencsekerék
          </button>
        </div>

        <div className="game-display">
          {activeTab === 'memory' ? <MemoryGame /> : <LuckyWheel />}
        </div>
      </div>
    </section>
  );
};

export default SpaApp;
