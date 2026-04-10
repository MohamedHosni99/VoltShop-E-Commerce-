import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectCartItems, selectCartTotal, clearCart } from "../store/slices/cartSlice";
import { selectUser } from "../store/slices/authSlice";
import Spinner from "../components/ui/Spinner";

// حفظ الأوردرات في localStorage
const saveOrder = (order) => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.unshift(order);
  localStorage.setItem("orders", JSON.stringify(orders));
};

export default function CheckoutPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const items     = useSelector(selectCartItems);
  const total     = useSelector(selectCartTotal);
  const user      = useSelector(selectUser);
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [order, setOrder]     = useState(null);
  const [shippingData, setShippingData] = useState({});

  const { register, handleSubmit, formState: { errors } } = useForm();

  const grandTotal = (total + (total > 50 ? 0 : 9.99) + total * 0.1).toFixed(2);

  const onShipping = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const onPayment = async (data) => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    const newOrder = {
      id: Date.now(),
      items,
      shipping: shippingData,
      payment: { last4: data.cardNum.slice(-4) },
      total: grandTotal,
      date: new Date().toLocaleDateString(),
    };
    saveOrder(newOrder);
    dispatch(clearCart());
    setOrder(newOrder);
    setStep(3);
    setLoading(false);
  };

  const inputStyle = {
    background: "#1c1c28", border: "1px solid #222", borderRadius: 8,
    padding: "10px 14px", color: "#f0f0f0", fontSize: 14, outline: "none", width: "100%",
  };
  const labelStyle = { fontSize: 12, color: "#888", fontWeight: 600, fontFamily: "Syne", textTransform: "uppercase", letterSpacing: 0.5 };

  const steps = ["Shipping", "Payment", "Confirmed"];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      {/* Steps */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, transition: "all 0.3s",
                background: step > i + 1 ? "#47ffb2" : step === i + 1 ? "#e8ff47" : "#13131a",
                border: `2px solid ${step >= i + 1 ? (step > i + 1 ? "#47ffb2" : "#e8ff47") : "#222"}`,
                color: step >= i + 1 ? "#000" : "#888",
              }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 13, fontFamily: "Syne", fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? "#f0f0f0" : "#888" }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? "#47ffb2" : "#222", margin: "0 12px", transition: "background 0.3s" }} />}
          </div>
        ))}
      </div>

      <div style={{ background: "#13131a", borderRadius: 16, padding: 32, border: "1px solid #222" }}>
        {/* Step 1: Shipping */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onShipping)} className="fade-in">
            <h2 style={{ fontFamily: "Syne", fontSize: 24, marginBottom: 24 }}>Shipping Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Full Name</label>
                  <input {...register("name", { required: true })} defaultValue={user?.name} placeholder="John Doe" style={{ ...inputStyle, borderColor: errors.name ? "#ff4d6d" : "#222" }}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = errors.name ? "#ff4d6d" : "#222"} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Email</label>
                  <input {...register("email", { required: true })} defaultValue={user?.email} type="email" placeholder="john@email.com" style={{ ...inputStyle, borderColor: errors.email ? "#ff4d6d" : "#222" }}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = errors.email ? "#ff4d6d" : "#222"} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Address</label>
                <input {...register("address", { required: true })} placeholder="123 Main Street" style={{ ...inputStyle, borderColor: errors.address ? "#ff4d6d" : "#222" }}
                  onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = errors.address ? "#ff4d6d" : "#222"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>City</label>
                  <input {...register("city", { required: true })} placeholder="New York" style={{ ...inputStyle, borderColor: errors.city ? "#ff4d6d" : "#222" }}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = errors.city ? "#ff4d6d" : "#222"} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>ZIP Code</label>
                  <input {...register("zip", { required: true })} placeholder="10001" style={{ ...inputStyle, borderColor: errors.zip ? "#ff4d6d" : "#222" }}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = errors.zip ? "#ff4d6d" : "#222"} />
                </div>
              </div>
            </div>
            <button type="submit" className="btn-hover"
              style={{ width: "100%", marginTop: 24, padding: 14, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", fontSize: 15, border: "none", cursor: "pointer" }}>
              Continue to Payment →
            </button>
          </form>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onPayment)} className="fade-in">
            <h2 style={{ fontFamily: "Syne", fontSize: 24, marginBottom: 8 }}>Payment Details</h2>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>🔒 Demo — no real payment processed</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Card Number</label>
                <input {...register("cardNum", { required: true, minLength: 16 })} placeholder="4242 4242 4242 4242" maxLength={19} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = "#222"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Expiry</label>
                  <input {...register("expiry", { required: true })} placeholder="MM/YY" maxLength={5} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = "#222"} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>CVV</label>
                  <input {...register("cvv", { required: true })} placeholder="123" maxLength={3} type="password" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#e8ff47"} onBlur={e => e.target.style.borderColor = "#222"} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24, padding: 16, background: "#1c1c28", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#888" }}>Order Total:</span>
              <span style={{ fontWeight: 800, fontFamily: "Syne", color: "#e8ff47", fontSize: 20 }}>${grandTotal}</span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button type="button" onClick={() => setStep(1)}
                style={{ flex: 1, padding: 14, borderRadius: 8, background: "#1c1c28", color: "#f0f0f0", fontWeight: 600, border: "none", cursor: "pointer" }}>
                ← Back
              </button>
              <button type="submit" disabled={loading} className="btn-hover"
                style={{ flex: 2, padding: 14, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", fontSize: 15, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <><Spinner size={18} /> Processing...</> : "Place Order 🎉"}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && order && (
          <div className="fade-in" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "Syne", fontSize: 28, marginBottom: 8 }}>Order Confirmed!</h2>
            <p style={{ color: "#888", marginBottom: 24 }}>Order #{order.id} placed successfully.</p>
            <div style={{ background: "#1c1c28", borderRadius: 8, padding: 16, marginBottom: 24, textAlign: "left" }}>
              <p style={{ fontSize: 13, color: "#888" }}>Shipping to: <span style={{ color: "#f0f0f0" }}>{order.shipping.address}, {order.shipping.city}</span></p>
              <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Card ending: <span style={{ color: "#f0f0f0" }}>••••{order.payment.last4}</span></p>
              <p style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Total: <span style={{ color: "#e8ff47", fontWeight: 700 }}>${order.total}</span></p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => navigate("/orders")}
                style={{ flex: 1, padding: 12, borderRadius: 8, background: "#13131a", border: "1px solid #222", color: "#f0f0f0", fontWeight: 600, cursor: "pointer" }}>
                View Orders
              </button>
              <button onClick={() => navigate("/")} className="btn-hover"
                style={{ flex: 1, padding: 12, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer" }}>
                Shop More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
