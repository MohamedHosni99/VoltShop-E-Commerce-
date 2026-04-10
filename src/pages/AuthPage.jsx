import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";

// ✅ برا AuthPage عشان متعملش re-render مع كل حرف
const Field = ({ label, field, type = "text", placeholder, value, onChange }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, color: "#888", fontWeight: 600, fontFamily: "Syne", textTransform: "uppercase", letterSpacing: 0.5 }}>
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      style={{ background: "#1c1c28", border: "1px solid #222", borderRadius: 8, padding: "12px 16px", color: "#f0f0f0", fontSize: 14, outline: "none" }}
      onFocus={e => e.target.style.borderColor = "#e8ff47"}
      onBlur={e  => e.target.style.borderColor = "#222"}
    />
  </div>
);

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const update = (f, v) => setForm(p => ({ ...p, [f]: v }));

  const handleAuth = async () => {
    if (!form.email || !form.password) return toast.error("Please fill all fields");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const user = { name: form.name || form.email.split("@")[0], email: form.email, id: Date.now() };
    dispatch(login(user));
    toast.success(`Welcome${isLogin ? " back" : ""}, ${user.name}! 👋`);
    navigate("/");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "0 24px" }} className="fade-in">
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "Syne", fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p style={{ color: "#888", fontSize: 14 }}>
          {isLogin ? "Sign in to your account" : "Join VoltShop today"}
        </p>
      </div>

      <div style={{ background: "#13131a", borderRadius: 16, padding: 32, border: "1px solid #222" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {!isLogin && (
            <Field
              label="Full Name"
              field="name"
              placeholder="John Doe"
              value={form.name}
              onChange={e => update("name", e.target.value)}
            />
          )}
          <Field
            label="Email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={e => update("email", e.target.value)}
          />
          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => update("password", e.target.value)}
          />
        </div>

        <button
          onClick={handleAuth}
          disabled={loading}
          className="btn-hover"
          style={{ width: "100%", padding: 14, borderRadius: 8, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", fontSize: 15, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {loading
            ? <><Spinner size={18} /> {isLogin ? "Signing in..." : "Creating..."}</>
            : (isLogin ? "Sign In →" : "Create Account →")
          }
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ width: "100%", marginTop: 16, color: "#888", fontSize: 13, background: "none", border: "none", cursor: "pointer" }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "#e8ff47", fontWeight: 600 }}>
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </button>

        <div style={{ marginTop: 16, padding: 10, background: "#1c1c28", borderRadius: 8, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#888" }}>Demo: use any email & password</p>
        </div>
      </div>
    </div>
  );
}