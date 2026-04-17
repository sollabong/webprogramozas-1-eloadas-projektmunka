import React, { useState, useEffect } from 'react';
import { tudosokData } from './tudosok-data';
import ScientistCard from '../components/scientist-card/scientist-card';
import './app.css';

const App = () => {
  const [scientists, setScientists] = useState(tudosokData);
  const [editingScientist, setEditingScientist] = useState(null);

  const [nev, setNev] = useState('');
  const [terulet, setTerulet] = useState('');

  useEffect(() => {
    if (editingScientist) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNev(editingScientist.nev);
      setTerulet(editingScientist.terulet);
    } else {
      setNev('');
      setTerulet('');
    }
  }, [editingScientist]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!nev || !terulet) return;

    if (editingScientist) {
      setScientists(
        scientists.map((s) =>
          s.id === editingScientist.id ? { ...s, nev, terulet } : s
        )
      );
      setEditingScientist(null);
    } else {
      const newScientist = {
        id: Date.now(),
        nev: nev,
        terulet: terulet,
      };
      setScientists([newScientist, ...scientists]);
    }

    setNev('');
    setTerulet('');
  };

  const deleteScientist = (id) => {
    if (window.confirm('Törlöd a kártyát?')) {
      setScientists(scientists.filter((s) => s.id !== id));
    }
  };

  return (
    <section>
      <h2>3. feladat: React + CRUD</h2>
      <div className="container">
        <section className="form-section">
          <form className="crud-form" onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Tudós neve"
              value={nev}
              onChange={(e) => setNev(e.target.value)}
            />
            <select
              value={terulet}
              onChange={(e) => setTerulet(e.target.value)}
            >
              <option value="" disabled selected>
              -- Válassz tudományterületet --
            </option>
            <option value="természettudományok">természettudományok</option>
            <option value="műszaki tudományok">műszaki tudományok</option>
            <option value="bölcsésztudományok">bölcsésztudományok</option>
            <option value="társadalomtudományok">társadalomtudományok</option>
            <option value="orvostudományok">orvostudományok</option>
            <option value="agrártudományok">agrártudományok</option>
            <option value="hittudomány">hittudomány</option>
            <option value="művészetek">művészetek</option>
            </select>

            <div className="button-group">
              <button type="submit" className="btn">
                {editingScientist ? 'Mentés' : 'Hozzáadás'}
              </button>
              {editingScientist && (
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setEditingScientist(null)}
                >
                  Mégse
                </button>
              )}
            </div>
          </form>
        </section>

        <div className="card-grid">
          {scientists.map((s) => (
            <ScientistCard
              key={s.id}
              scientist={s}
              onDelete={deleteScientist}
              onEdit={(data) => {
                setEditingScientist(data);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
