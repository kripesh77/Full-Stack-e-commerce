function Button({ children, className }) {
  return <button className={`button__content ${className}`}>{children}</button>;
}

export default Button;
