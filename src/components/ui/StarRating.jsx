export default function StarRating({ rating = 4.5 }) {
  const stars = Math.round(rating);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= stars ? "#e8ff47" : "#222", fontSize: 12 }}>
          ★
        </span>
      ))}
    </div>
  );
}
