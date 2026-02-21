import { useState } from "react";
import { type CardProps } from "../types/types";

const Card = ({
  logo,
  name,
  description,
  isActive,
  index,
  onToggle,
}: CardProps) => {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="card">
      <div className="top-card">
        <img src={base + logo} alt="Card Icon" />
        <div className="text">
          <h3 className="card-title">{name}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
      <div className="bottom-card">
        <button className="btn">Remove</button>
        <div className="toggle-group">
          <input
            type="checkbox"
            id={`toggle-${index}`}
            name="switch"
            checked={isActive}
            onChange={() => onToggle(index)}
          />
          <label htmlFor={`toggle-${index}`} className="toggle-label"></label>
        </div>
      </div>
    </div>
  );
};

export default Card;
