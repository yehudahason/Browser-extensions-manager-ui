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

  return (
    <div className="card">
      <div className="top-card">
        <img src={base + logo} alt={`${name} icon`} />
        <div className="text">
          <h3 className="card-title">{name}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>

      <div className="bottom-card">
        <button className="btn" onClick={() => onRemove(name)}>
          Remove
        </button>

        <div className="toggle-group">
          <input
            type="checkbox"
            id={`toggle-${name}`}
            checked={isActive}
            onChange={() => onToggle(name)}
          />
          <label htmlFor={`toggle-${name}`} className="toggle-label"></label>
        </div>
      </div>
    </div>
  );
};

export default Card;
