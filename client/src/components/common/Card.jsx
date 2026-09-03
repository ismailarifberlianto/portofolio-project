import "./Card.css";

function Card({ children, className = "", ...props }) {
  return (
    <div className={`clay-card ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;