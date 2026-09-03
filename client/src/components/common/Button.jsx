import "./Button.css";

function Button({ children, variant = "primary", as = "button", ...props }) {
  const Component = as;
  return (
    <Component className={`clay-btn clay-btn--${variant}`} {...props}>
      {children}
    </Component>
  );
}

export default Button;