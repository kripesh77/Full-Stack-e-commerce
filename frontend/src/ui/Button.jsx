function Button({ children, disabled, className }) {
  return (
    <button className={` ${className}`} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
