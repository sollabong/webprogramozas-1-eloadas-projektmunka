import './scientist-card.css';

const ScientistCard = ({ scientist, onEdit, onDelete }) => {
  return (
    <div className="scientist-card">
      <div className="card-actions">
        <button
          className="btn-icon edit"
          onClick={() => onEdit(scientist)}
          title="Szerkesztés"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          className="btn-icon delete"
          onClick={() => onDelete(scientist.id)}
          title="Törlés"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>

      <div className="avatar-placeholder">
        <i className="fa-solid fa-user-tie"></i>
      </div>

      <div className="card-info">
        <h3>{scientist.nev}</h3>
        <span className="terulet-label">{scientist.terulet}</span>
      </div>
    </div>
  );
};

export default ScientistCard;
