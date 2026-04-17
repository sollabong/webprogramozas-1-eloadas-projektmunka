import './dashboard-event-card.css';

const DashboardEventCard = ({ event, onEdit, onDelete }) => {
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
      <img src={imageUrl} alt={event.cim} className="event-card-image" />
      <div className="card-info">
        <h3>{event.cim}</h3>
      </div>
      <div className="event-date">{event.ido}</div>
    </div>
  );
};

export default DashboardEventCard;
