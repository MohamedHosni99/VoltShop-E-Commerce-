export default function Badge({ children, color = "#e8ff47" }) {
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 4,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "Syne, sans-serif",
      }}
    >
      {children}
    </span>
  );
}
