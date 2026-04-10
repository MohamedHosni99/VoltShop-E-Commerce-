import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { selectCartCount } from "../../store/slices/cartSlice";
import { selectUser, logout } from "../../store/slices/authSlice";

const NavBtn = ({ to, label, onClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <button
      onClick={() => { navigate(to); onClick?.(); }}
      style={{
        padding: "6px 14px", borderRadius: 6, fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer",
        color:      pathname === to ? "#e8ff47" : "#888",
        background: pathname === to ? "#e8ff4715" : "none",
        transition: "all 0.2s",
        width: "100%",
        textAlign: "left",
      }}
    >
      {label}
    </button>
  );
};

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const dispatch  = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const user      = useSelector(selectUser);
  const path      = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#0a0a0fee", backdropFilter: "blur(20px)", borderBottom: "1px solid #222", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button onClick={() => navigate("/")} style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#e8ff47", letterSpacing: -0.5, background: "none", border: "none", cursor: "pointer" }}>
            VOLT<span style={{ color: "#f0f0f0" }}>SHOP</span>
          </button>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <NavBtn to="/"         label="Shop"     />
            <NavBtn to="/wishlist" label="Wishlist"  />
            <NavBtn to="/orders"   label="Orders"    />

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              style={{ position: "relative", padding: "6px 14px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
                color:      path === "/cart" ? "#000" : "#f0f0f0",
                background: path === "/cart" ? "#e8ff47" : "#13131a",
                border:     `1px solid ${path === "/cart" ? "#e8ff47" : "#222"}`,
              }}
            >
              🛒 Cart
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: "#ff4d6d", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
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

          {/* Mobile Right Side */}
          <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: 12 }}>
            {/* Cart Icon */}
            <button onClick={() => navigate("/cart")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>
              🛒
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, background: "#ff4d6d", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
              <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#e8ff47" : "#f0f0f0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#f0f0f0", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: menuOpen ? "#e8ff47" : "#f0f0f0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-nav" style={{
          display: "none",
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#13131a", borderBottom: "1px solid #222",
          padding: "16px 24px", flexDirection: "column", gap: 8,
        }}>
          <NavBtn to="/"         label="Shop"     onClick={closeMenu} />
          <NavBtn to="/wishlist" label="Wishlist"  onClick={closeMenu} />
          <NavBtn to="/orders"   label="Orders"    onClick={closeMenu} />

          <div style={{ borderTop: "1px solid #222", paddingTop: 12, marginTop: 4 }}>
            {user ? (
              <button onClick={() => { dispatch(logout()); closeMenu(); }}
                style={{ color: "#888", fontSize: 13, padding: "6px 14px", background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}>
                👤 {user.name?.split(" ")[0]} · Logout
              </button>
            ) : (
              <button onClick={() => { navigate("/auth"); closeMenu(); }}
                style={{ padding: "10px 14px", borderRadius: 6, fontSize: 14, background: "#e8ff47", color: "#000", fontWeight: 700, fontFamily: "Syne", border: "none", cursor: "pointer", width: "100%" }}>
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav  { display: flex !important; }
        }
      `}</style>
    </>
  );
}