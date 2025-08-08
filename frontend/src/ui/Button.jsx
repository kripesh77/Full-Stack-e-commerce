function Button({ children, className }) {
  return (
    <button
      className={`font-geo-medium relative z-10 rounded-4xl text-black uppercase ${className}`}
      style={{
        backgroundColor: "#ffffff",
        opacity: 1,
      }}
    >
      {children}
    </button>
  );
}

export default Button;
