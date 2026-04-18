import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosApp = () => {
  const [tudosok, setTudosok] = useState([]);
  const API = '../server/api.php';

  const refresh = () => axios.get(API).then(res => setTudosok(res.data));
  
  useEffect(() => { refresh(); }, []);

  const handleDelete = (id) => {
    axios.delete(`${API}?id=${id}`).then(() => refresh());
  };

  return (
    <div className="container">
      <h2>Adatbázis CRUD (Axios)</h2>
      <div className="card-grid">
        {tudosok.map(t => (
          <div key={t.id} className="event-card">
            <h3>{t.nev}</h3>
            <p>{t.terulet}</p>
            <button className="btn-delete" onClick={() => handleDelete(t.id)}>Törlés</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AxiosApp;