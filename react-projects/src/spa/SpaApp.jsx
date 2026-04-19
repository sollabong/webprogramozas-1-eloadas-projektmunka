import React, { useState } from 'react';
import MemoryGame from './memory-game';
import LuckyWheel from './lucky-wheel';
import './spa.css';

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
