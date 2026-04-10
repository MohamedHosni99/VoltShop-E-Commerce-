import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectWishlist } from "../store/slices/wishlistSlice";
import ProductCard from "../components/ui/ProductCard";

export default function WishlistPage() {
  const navigate  = useNavigate();
  const wishlist  = useSelector(selectWishlist);

  if (wishlist.length === 0) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }} className="fade-in">
      <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
      <h2 style={{ fontFamily: "Syne", fontSize: 28, marginBottom: 12 }}>Wishlist is Empty</h2>
      <p style={{ color: "#888", marginBottom: 32 }}>Save items you love for later.</p>
      <button onClick={() => navigate("/")} className="btn-hover"
        style={{ padding: "12px 32px", borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
        Browse Products
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32, fontFamily: "Syne" }}>
        Wishlist <span style={{ color: "#888", fontSize: 20, fontWeight: 400 }}>({wishlist.length})</span>
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
