import React, { useState, useEffect } from 'react';
import DashboardEventCard from '../components/dashboard-event-card/dashboard-event-card';
import ScientistCard from '../components/scientist-card/scientist-card';
import { api } from './api';
import './app.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'scientists'
  const [eloadasok, setEloadasok] = useState([]);
  const [tudosok, setTudosok] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const eRes = await api.getAllEvents();
      const tRes = await api.getAllScientists();
      setEloadasok(eRes.data);
      setTudosok(tRes.data);
    } catch (err) {
      console.error('Adatbetöltési hiba:', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  useEffect(() => {
    if (editingItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput1(activeTab === 'events' ? editingItem.cim : editingItem.nev);
      setInput2(
        activeTab === 'events'
          ? editingItem.ido?.replaceAll('.', '-') || ''
          : editingItem.terulet
      );
    } else {
      setInput1('');
      setInput2('');
    }
  }, [editingItem, activeTab]);

  const filteredEvents = eloadasok.filter(el => 
    el.cim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScientists = tudosok.filter(sc => 
    sc.nev.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sc.terulet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async (e) => {
    e.preventDefault();

    const payload =
      activeTab === 'events'
        ? { id: editingItem?.id, cim: input1, ido: input2.replaceAll('-', '.') }
        : { id: editingItem?.id, nev: input1, terulet: input2 };

    try {
      if (activeTab === 'events') {
        editingItem
          ? await api.updateEvent(payload)
          : await api.createEvent(payload);
      } else {
        editingItem
          ? await api.updateScientist(payload)
          : await api.createScientist(payload);
      }

      setEditingItem(null);
      loadData();
    } catch (err) {
      alert('Hiba történt a mentés során!', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Biztosan törölni szeretnéd?')) return;
    try {
      activeTab === 'events'
        ? await api.deleteEvent(id)
        : await api.deleteScientist(id);
      loadData();
    } catch (err) {
      alert('Hiba a törlésnél!', err);
    }
  };

  return (
    <section className="dashboard-wrapper">
      <h2>Mindentudás Egyeteme Dashboard - Axios (6. feladat)</h2>
      <nav className="tab-nav">
        <button
          className={`tab-item ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('events');
            setEditingItem(null);
            setSearchTerm('');
          }}
        >
          <i className="fa-solid fa-calendar-days"></i> Előadások
        </button>
        <button
          className={`tab-item ${activeTab === 'scientists' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('scientists');
            setEditingItem(null);
            setSearchTerm('');
          }}
        >
          <i className="fa-solid fa-flask"></i> Tudósok
        </button>
      </nav>

      <div className="tab-panel">
        <section className="form-section">
          <form className="crud-form" onSubmit={handleSave}>
            <input
              type="text"
              placeholder={
                activeTab === 'events' ? 'Előadás címe' : 'Tudós neve'
              }
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              required
            />
            {activeTab === 'events' ? (
              <input
                type="date"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                required
              />
            ) : (
              <select
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Tudományterület --
                </option>
                <option value="természettudományok">természettudományok</option>
                <option value="műszaki tudományok">műszaki tudományok</option>
                <option value="bölcsésztudományok">bölcsésztudományok</option>
                <option value="társadalomtudományok">
                  társadalomtudományok
                </option>
                <option value="orvostudományok">orvostudományok</option>
                <option value="agrártudományok">agrártudományok</option>
                <option value="hittudomány">hittudomány</option>
                <option value="művészetek">művészetek</option>
              </select>
            )}
            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                {editingItem ? 'Mentés' : 'Hozzáadás'}
              </button>
              {editingItem && (
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => setEditingItem(null)}
                >
                  Mégse
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder={activeTab === 'events' ? "Keresés az előadások között..." : "Keresés név vagy terület alapján..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </section>

        <div className="card-grid">
          {activeTab === 'events'
            ? filteredEvents.map((el) => (
                <DashboardEventCard
                  key={el.id}
                  event={el}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                />
              ))
            : filteredScientists.map((sc) => (
                <ScientistCard
                  key={sc.id}
                  scientist={sc}
                  onEdit={setEditingItem}
                  onDelete={handleDelete}
                />
              ))}
        </div>

        {((activeTab === 'events' && filteredEvents.length === 0) || 
          (activeTab === 'scientists' && filteredScientists.length === 0)) && (
          <div className="no-results">
            <i className="fa-solid fa-face-frown"></i>
            <p>Nincs a keresésnek megfelelő találat.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default App;
