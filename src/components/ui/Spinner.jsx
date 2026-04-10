export default function Spinner({ size = 24 }) {
  return (
    <div
      className="spin"
      style={{
        width: size,
        height: size,
        border: "2px solid #222",
        borderTop: "2px solid #e8ff47",
        borderRadius: "50%",
      }}
    />
  );
}
