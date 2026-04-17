import './event-card.css';

const EventCard = ({ event, onEdit, onDelete, onToggleParticipated }) => {
  const evszam = event.ido ? event.ido.substring(0, 4) : 'N/A';
  const imageUrl = `https://picsum.photos/seed/${event.id}/300/200`;

  return (
    <div className={`event-card ${event.participated ? 'participated' : ''}`}>
      <div className="card-actions">
        <button
          className="btn-icon edit"
          onClick={() => onEdit(event)}
          title="Szerkesztés"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          className="btn-icon delete"
          onClick={() => onDelete(event.id)}
          title="Törlés"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <div className="year-label">{evszam}</div>
      <img src={imageUrl} alt={event.cim} className="event-card-image" />
      <div className="card-info">
        <h3>{event.cim}</h3>
      </div>
      <button
        className={`btn-participate ${event.participated ? 'active' : ''}`}
        onClick={() => onToggleParticipated(event.id)}
      >
        {event.participated ? 'Ott voltam' : 'Részt vettem'}
      </button>
    </div>
  );
};

export default EventCard;
