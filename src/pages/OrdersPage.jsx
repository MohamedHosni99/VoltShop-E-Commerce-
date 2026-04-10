import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../components/ui/Badge";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(saved);
  }, []);

  if (orders.length === 0) return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center", padding: 24 }} className="fade-in">
      <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
      <h2 style={{ fontFamily: "Syne", fontSize: 28, marginBottom: 12 }}>No Orders Yet</h2>
      <p style={{ color: "#888", marginBottom: 32 }}>Your order history will appear here.</p>
      <button onClick={() => navigate("/")} className="btn-hover"
        style={{ padding: "12px 32px", borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
        Start Shopping
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32, fontFamily: "Syne" }}>Order History</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {orders.map(order => (
          <div key={order.id} style={{ background: "#13131a", borderRadius: 12, padding: 24, border: "1px solid #222" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700 }}>Order #{order.id}</h3>
                  <Badge color="#47ffb2">Delivered</Badge>
                </div>
                <p style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
                  {order.date} · {order.items?.length} items · Card ••••{order.payment?.last4}
                </p>
              </div>
              <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#e8ff47" }}>${order.total}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {order.items?.slice(0, 4).map(item => (
                <img key={item.id}
                  src={item.images?.[0] || `https://picsum.photos/seed/${item.id}/50/50`}
                  alt={item.title}
                  onError={e => e.target.src = `https://picsum.photos/seed/${item.id}/50/50`}
                  style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid #222" }}
                />
              ))}
              {order.items?.length > 4 && (
                <div style={{ width: 48, height: 48, borderRadius: 8, background: "#1c1c28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#888", fontWeight: 700 }}>
                  +{order.items.length - 4}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
