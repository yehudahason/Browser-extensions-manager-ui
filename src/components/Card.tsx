import { type CardProps } from "../types/types";

const Card = ({
  logo,
  name,
  description,
  isActive,
  onToggle,
  onRemove,
}: CardProps) => {
  const base = import.meta.env.BASE_URL;

  const uniqueId = name?.replace(/\s+/g, "-").toLowerCase();

  return (
    <article className="card" aria-labelledby={`title-${uniqueId}`}>
      <div className="top-card">
        <img src={base + logo} alt="" role="presentation" />

        <div className="text">
          <h3 id={`title-${uniqueId}`} className="card-title">
            {name}
          </h3>
          <p className="card-description">{description}</p>
        </div>
      </div>

      <div className="bottom-card">
        <button
          className="btn"
          onClick={() => onRemove(name)}
          aria-label={`Remove ${name}`}
        >
          Remove
        </button>

        <div className="toggle-group">
          <input
            type="checkbox"
            id={`toggle-${uniqueId}`}
            className="sr-only" // Hide visually, keep for screen readers
            checked={isActive}
            onChange={() => onToggle(name)}
          />
          {/* 3. Text inside the label for screen readers */}
          <label htmlFor={`toggle-${uniqueId}`} className="toggle-label">
            <span className="sr-only">Activate {name}</span>
          </label>
        </div>
      </div>
    </article>
  );
};

export default Card;
