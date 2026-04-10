import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectCartCount } from "../../store/slices/cartSlice";
import { selectUser, logout } from "../../store/slices/authSlice";

// 1. انقل المكون هنا (خارج الـ Navbar)
const NavBtn = ({ to, label, path, navigate }) => (
  <button
    onClick={() => navigate(to)}
    style={{
      padding: "6px 14px", borderRadius: 6, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer",
      color:      path === to ? "#e8ff47" : "#888",
      background: path === to ? "#e8ff4715" : "none",
      transition: "all 0.2s",
    }}
  >
    {label}
  </button>
);

export default function Navbar() {
  const navigate  = useNavigate(); //
  const location  = useLocation(); //
  const dispatch  = useDispatch(); //
  const cartCount = useSelector(selectCartCount); //
  const user      = useSelector(selectUser); //
  const path      = location.pathname; //

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#0a0a0fee", backdropFilter: "blur(20px)", borderBottom: "1px solid #222", padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <button onClick={() => navigate("/")} style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#e8ff47", letterSpacing: -0.5, background: "none", border: "none", cursor: "pointer" }}>
          VOLT<span style={{ color: "#f0f0f0" }}>SHOP</span>
        </button>

        {/* Links */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* 2. مرر الـ path والـ navigate كـ props */}
          <NavBtn to="/"         label="Shop"     path={path} navigate={navigate} />
          <NavBtn to="/wishlist" label="Wishlist"  path={path} navigate={navigate} />
          <NavBtn to="/orders"   label="Orders"    path={path} navigate={navigate} />

          {/* ... باقي كود الـ Cart والـ Auth كما هو ... */}
          <button
            onClick={() => navigate("/cart")}
            style={{ position: "relative", padding: "6px 14px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", color: path === "/cart" ? "#000" : "#f0f0f0", background: path === "/cart" ? "#e8ff47" : "#13131a", border: `1px solid ${path === "/cart" ? "#e8ff47" : "#222"}` }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -6, right: -6, background: "#ff4d6d", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                {cartCount}
              </span>
            )}
          </button>
          
          {user ? (
            <button onClick={() => dispatch(logout())} style={{ color: "#888", fontSize: 13, padding: "6px 12px", background: "none", border: "none", cursor: "pointer" }}>
              👤 {user.name?.split(" ")[0]} · Logout
            </button>
          ) : (
            <button onClick={() => navigate("/auth")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 14, background: "#13131a", border: "1px solid #222", color: "#f0f0f0", cursor: "pointer" }}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}