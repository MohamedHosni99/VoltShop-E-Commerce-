export default function SkeletonCard() {
  return (
    <div style={{ background: "#13131a", borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
      <div style={{ height: 200, background: "#1c1c28" }} className="pulse" />
      <div style={{ padding: 16 }}>
        {[80, 60, 40].map((w, i) => (
          <div
            key={i}
            className="pulse"
            style={{ height: 12, background: "#1c1c28", borderRadius: 6, width: `${w}%`, marginBottom: 8 }}
          />
        ))}
      </div>
    </div>
  );
}
