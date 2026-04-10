import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems, selectCartTotal, removeFromCart, updateQty } from "../store/slices/cartSlice";
import { selectUser } from "../store/slices/authSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items    = useSelector(selectCartItems);
  const total    = useSelector(selectCartTotal);
  const user     = useSelector(selectUser);

  const shipping = total > 50 ? 0 : 9.99;
  const tax      = total * 0.1;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) return (
    <div style={{ maxWidth: 600, margin: "80px auto", textAlign: "center", padding: 24 }} className="fade-in">
      <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, fontFamily: "Syne" }}>Cart is empty</h2>
      <p style={{ color: "#888", marginBottom: 32 }}>You haven't added anything yet.</p>
      <button onClick={() => navigate("/")} className="btn-hover"
        style={{ padding: "12px 32px", borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
        Start Shopping
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32, fontFamily: "Syne" }}>
        Your Cart <span style={{ color: "#888", fontSize: 20, fontWeight: 400 }}>({items.length} items)</span>
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map(item => (
            <div key={item.id} className="fade-in"
              style={{ display: "flex", gap: 16, background: "#13131a", borderRadius: 12, padding: 16, border: "1px solid #222" }}>
              <img
                src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/80/80`}
                alt={item.title}
                onError={e => e.target.src = `https://picsum.photos/seed/${item.id}/80/80`}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "Syne", lineHeight: 1.3 }}>
                    {item.title.slice(0, 60)}
                  </h3>
                  <button onClick={() => dispatch(removeFromCart(item.id))}
                    style={{ color: "#ff4d6d", fontSize: 20, background: "none", border: "none", cursor: "pointer", marginLeft: 8, flexShrink: 0 }}>
                    ×
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", background: "#1c1c28", borderRadius: 6, overflow: "hidden" }}>
                    <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                      style={{ padding: "4px 10px", color: "#f0f0f0", background: "none", border: "none", cursor: "pointer" }}>−</button>
                    <span style={{ padding: "4px 10px", fontWeight: 700, fontFamily: "Syne" }}>{item.qty}</span>
                    <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                      style={{ padding: "4px 10px", color: "#f0f0f0", background: "none", border: "none", cursor: "pointer" }}>+</button>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: "#e8ff47", fontFamily: "Syne" }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background: "#13131a", borderRadius: 12, padding: 24, border: "1px solid #222", height: "fit-content", position: "sticky", top: 80 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, fontFamily: "Syne" }}>Order Summary</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {[
              ["Subtotal", `$${total.toFixed(2)}`],
              ["Shipping", shipping === 0 ? "Free 🎉" : `$${shipping.toFixed(2)}`],
              ["Tax (10%)", `$${tax.toFixed(2)}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#888" }}>
                <span>{k}</span><span style={{ color: "#f0f0f0" }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #222", paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800, fontFamily: "Syne" }}>
              <span>Total</span>
              <span style={{ color: "#e8ff47", fontSize: 22 }}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => navigate(user ? "/checkout" : "/auth")} className="btn-hover"
            style={{ width: "100%", padding: 14, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontSize: 15, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
            {user ? "Proceed to Checkout →" : "Login to Checkout →"}
          </button>
          <button onClick={() => navigate("/")}
            style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 8, color: "#888", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
