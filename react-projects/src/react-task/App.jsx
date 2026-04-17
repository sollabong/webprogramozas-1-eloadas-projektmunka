import React, { useState, useEffect } from 'react';
import { eloadasokData } from './eloadasok-data';
import EventCard from '../components/event-card/event-card';
import './app.css';

const App = () => {
  const [eloadasok, setEloadasok] = useState(
    eloadasokData.map(e => ({ 
      ...e, 
      participated: false, 
    }))
  );
  
  const [editingEloadas, setEditingEloadas] = useState(null);
  const [cim, setCim] = useState('');
  const [ido, setIdo] = useState('');

  useEffect(() => {
    if (editingEloadas) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCim(editingEloadas.cim);
      const formattedDate = editingEloadas.ido ? editingEloadas.ido.replaceAll('.', '-') : '';
      setIdo(formattedDate);
    } else {
      setCim('');
      setIdo('');
    }
  }, [editingEloadas]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!cim || !ido) return;

    const displayDate = ido.replaceAll('-', '.');

    if (editingEloadas) {
      setEloadasok(eloadasok.map(el => 
        el.id === editingEloadas.id ? { ...el, cim, ido: displayDate } : el
      ));
      setEditingEloadas(null);
    } else {
      const newEloadas = {
        id: Date.now(),
        cim,
        ido: displayDate,
        participated: false,
      };
      setEloadasok([newEloadas, ...eloadasok]);
    }
    setCim('');
    setIdo('');
  };

  const toggleParticipated = (id) => {
    setEloadasok(eloadasok.map(el => 
      el.id === id ? { ...el, participated: !el.participated } : el
    ));
  };

  return (
    <section className="container">
      <h2>Előadások - React CRUD (3. feladat)</h2>
      
      <form className="form-section crud-form" onSubmit={handleSave}>
        <input 
          type="text" 
          placeholder="Előadás címe" 
          value={cim} 
          onChange={(e) => setCim(e.target.value)} 
          required
        />
        <input 
          type="date" 
          value={ido} 
          onChange={(e) => setIdo(e.target.value)} 
          required
        />
        <button className="btn" type="submit">
          {editingEloadas ? 'Mentés' : 'Új előadás'}
        </button>
        {editingEloadas && (
          <button className="btn-outline" type="button" onClick={() => setEditingEloadas(null)}>
            Mégse
          </button>
        )}
      </form>

      <div className="card-grid">
        {eloadasok.map(el => (
          <EventCard 
            key={el.id} 
            event={el} 
            onEdit={setEditingEloadas}
            onDelete={(id) => setEloadasok(eloadasok.filter(e => e.id !== id))}
            onToggleParticipated={toggleParticipated}
          />
        ))}
      </div>
    </section>
  );
};

export default App;