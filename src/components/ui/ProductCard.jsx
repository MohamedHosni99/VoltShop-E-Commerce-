import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleWishlist, selectWishlist } from "../../store/slices/wishlistSlice";
import toast from "react-hot-toast";
import Badge from "./Badge";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const wishlist  = useSelector(selectWishlist);
  const inWishlist = wishlist.find(i => i.id === product.id);
  const img = product.images?.[0] || `https://picsum.photos/seed/${product.id}/400/300`;
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);

  const handleAdd = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart 🛒");
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(inWishlist ? "Removed from wishlist" : "Added to wishlist ❤️");
  };

  return (
    <div
      className="card-hover"
      style={{ background: "#13131a", borderRadius: 12, overflow: "hidden", border: "1px solid #222", display: "flex", flexDirection: "column" }}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingTop: "66%", background: "#1c1c28", overflow: "hidden" }}>
        <img
          src={img}
          alt={product.title}
          onError={e => { e.target.src = `https://picsum.photos/seed/${product.id}/400/300`; }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseOver={e => e.target.style.transform = "scale(1.05)"}
          onMouseOut={e  => e.target.style.transform = "scale(1)"}
        />
        <button
          onClick={handleWishlist}
          style={{ position: "absolute", top: 8, right: 8, background: "#0a0a0fcc", borderRadius: "50%", width: 32, height: 32, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}
        >
          {inWishlist ? "❤️" : "🤍"}
        </button>
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <Badge>{product.category?.name || "General"}</Badge>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StarRating rating={parseFloat(rating)} />
          <span style={{ color: "#888", fontSize: 12 }}>({Math.floor(Math.random() * 200 + 10)})</span>
        </div>
        <h3 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: "#f0f0f0", fontFamily: "Syne", flex: 1 }}>
          {product.title.length > 50 ? product.title.slice(0, 50) + "…" : product.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#e8ff47", fontFamily: "Syne" }}>${product.price}</span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #222", color: "#888", fontSize: 12, background: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "#e8ff47"; e.currentTarget.style.color = "#e8ff47"; }}
              onMouseOut={e  => { e.currentTarget.style.borderColor = "#222";    e.currentTarget.style.color = "#888"; }}
            >
              View
            </button>
            <button
              onClick={handleAdd}
              className="btn-hover"
              style={{ padding: "6px 12px", borderRadius: 6, background: "#e8ff47", color: "#000", fontSize: 12, fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
