import React from 'react';
import './scientist-card.css';

const ScientistCard = ({ scientist, onEdit, onDelete }) => {
  return (
    <div className="event-card scientist-card">
      <div className="scientist-image-placeholder">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/jpg?seed=${scientist.id}`}
          alt={scientist.nev}
        />
      </div>

      <div className="card-info">
        <h3>{scientist.nev}</h3>
        <span className="terulet-label">{scientist.terulet}</span>
      </div>

      <div className="scientist-card-actions">
        <button
          className="btn-icon edit"
          onClick={() => onEdit(scientist)}
          title="Szerkesztés"
        >
          <i className="fa-solid fa-user-pen"></i>
        </button>
        <button
          className="btn-icon delete"
          onClick={() => onDelete(scientist.id)}
          title="Törlés"
        >
          <i className="fa-solid fa-user-minus"></i>
        </button>
      </div>
    </div>
  );
};

export default ScientistCard;
