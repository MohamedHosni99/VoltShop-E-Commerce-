const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#e8ff47] text-black hover:bg-[#d4eb30]",
    secondary: "bg-white/5 border border-[#333] text-white hover:border-[#e8ff47]/50",
    danger: "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
