import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist, selectWishlist } from "../store/slices/wishlistSlice";
import { getProductById } from "../services/api";
import toast from "react-hot-toast";
import Badge from "../components/ui/Badge";
import StarRating from "../components/ui/StarRating";
import Spinner from "../components/ui/Spinner";

export default function ProductDetailPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const dispatch    = useDispatch();
  const wishlist    = useSelector(selectWishlist);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx]   = useState(0);
  const [qty, setQty]         = useState(1);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => toast.error("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner size={40} /></div>;
  if (!product) return <div style={{ textAlign: "center", padding: 80 }}>Product not found</div>;

  const imgs = product.images?.filter(i => !i.includes("[")) || [`https://picsum.photos/seed/${id}/600/400`];
  const inWishlist = wishlist.find(i => i.id === product.id);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    toast.success(`Added ${qty} item(s) to cart 🛒`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <button onClick={() => navigate(-1)} style={{ color: "#888", fontSize: 14, marginBottom: 24, background: "none", border: "none", cursor: "pointer" }}>
        ← Back
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {/* Images */}
        <div>
          <div style={{ borderRadius: 12, overflow: "hidden", background: "#13131a", marginBottom: 12, aspectRatio: "4/3" }}>
            <img src={imgs[imgIdx]} alt={product.title}
              onError={e => e.target.src = `https://picsum.photos/seed/${id}/600/400`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {imgs.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                style={{ flex: 1, aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: `2px solid ${i === imgIdx ? "#e8ff47" : "#222"}`, background: "#13131a", cursor: "pointer", padding: 0, transition: "border-color 0.2s" }}>
                <img src={img} alt="" onError={e => e.target.src = `https://picsum.photos/seed/${id + i}/100/100`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <Badge>{product.category?.name || "General"}</Badge>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 12, lineHeight: 1.2, fontFamily: "Syne" }}>{product.title}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StarRating rating={4.5} />
            <span style={{ color: "#888", fontSize: 13 }}>(128 reviews)</span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#e8ff47", fontFamily: "Syne" }}>${product.price}</div>
          <p style={{ color: "#888", lineHeight: 1.7, fontSize: 14 }}>{product.description || "Premium quality product."}</p>

          {/* Qty */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#888", fontSize: 14 }}>Qty:</span>
            <div style={{ display: "flex", alignItems: "center", background: "#13131a", borderRadius: 8, border: "1px solid #222", overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: "8px 14px", color: "#f0f0f0", fontSize: 18, background: "none", border: "none", cursor: "pointer" }}>−</button>
              <span style={{ padding: "8px 16px", fontWeight: 700, fontFamily: "Syne", minWidth: 40, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ padding: "8px 14px", color: "#f0f0f0", fontSize: 18, background: "none", border: "none", cursor: "pointer" }}>+</button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={handleAdd} className="btn-hover"
              style={{ flex: 1, padding: 14, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontSize: 15, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
              Add to Cart
            </button>
            <button onClick={() => { dispatch(toggleWishlist(product)); toast(inWishlist ? "Removed ♡" : "Saved ❤️"); }}
              className="btn-hover"
              style={{ padding: "14px 18px", borderRadius: 8, background: "#13131a", border: `1px solid ${inWishlist ? "#ff4d6d" : "#222"}`, fontSize: 20, cursor: "pointer" }}>
              {inWishlist ? "❤️" : "🤍"}
            </button>
          </div>

          <div style={{ borderTop: "1px solid #222", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {["✅ Free shipping over $50", "🔄 30-day returns", "🛡️ 2-year warranty", "📦 Ships in 1-3 days"].map(f => (
              <span key={f} style={{ fontSize: 13, color: "#888" }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
