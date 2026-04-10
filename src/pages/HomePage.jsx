import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import SkeletonCard from "../components/ui/SkeletonCard";

const PER_PAGE = 12;

export default function HomePage() {
  const { products, categories, loading, error } = useProducts();
  const [search, setSearch]               = useState("");
  const [debouncedSearch, setDebounced]   = useState("");
  const [selectedCat, setSelectedCat]     = useState("all");
  const [sort, setSort]                   = useState("default");
  const [currentPage, setCurrentPage]     = useState(1);

  // Debounce: ما يبعتش request مع كل حرف
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => setCurrentPage(1), [debouncedSearch, selectedCat, sort]);

  const filtered = products
    .filter(p => selectedCat === "all" || p.category?.id === selectedCat)
    .filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) =>
      sort === "price-asc"  ? a.price - b.price :
      sort === "price-desc" ? b.price - a.price :
      sort === "name"       ? a.title.localeCompare(b.title) : 0
    );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }} className="fade-in">
      {/* Hero */}
      <div style={{ marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid #222" }}>
        <div style={{ display: "inline-block", background: "#e8ff4715", border: "1px solid #e8ff4733", borderRadius: 4, padding: "4px 12px", fontSize: 12, color: "#e8ff47", fontFamily: "Syne", fontWeight: 600, marginBottom: 16 }}>
          NEW COLLECTION 2025
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, lineHeight: 1, color: "#f0f0f0", marginBottom: 16, letterSpacing: -2 }}>
          Shop the<br /><span style={{ color: "#e8ff47" }}>Future.</span>
        </h1>
        <p style={{ color: "#888", fontSize: 16, maxWidth: 500 }}>
          Premium products, curated for you. Browse, wishlist, and checkout in seconds.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32, alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#888" }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{ width: "100%", background: "#13131a", border: "1px solid #222", borderRadius: 8, padding: "10px 12px 10px 36px", color: "#f0f0f0", fontSize: 14, outline: "none" }}
            onFocus={e => e.target.style.borderColor = "#e8ff47"}
            onBlur={e  => e.target.style.borderColor = "#222"}
          />
        </div>

        {/* Category */}
        <select
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value === "all" ? "all" : parseInt(e.target.value))}
          style={{ background: "#13131a", border: "1px solid #222", borderRadius: 8, padding: "10px 16px", color: "#f0f0f0", fontSize: 14, outline: "none", cursor: "pointer" }}
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ background: "#13131a", border: "1px solid #222", borderRadius: 8, padding: "10px 16px", color: "#f0f0f0", fontSize: 14, outline: "none", cursor: "pointer" }}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      {!loading && <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>{filtered.length} products found</p>}

      {/* Grid */}
      {error ? (
        <div style={{ textAlign: "center", padding: 80, color: "#ff4d6d" }}>⚠️ {error}</div>
      ) : loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {paginated.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 48 }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                style={{ padding: "8px 16px", borderRadius: 6, background: "#13131a", border: "1px solid #222", color: currentPage === 1 ? "#222" : "#f0f0f0", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
                ← Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = Math.max(1, currentPage - 2) + i;
                if (pg > totalPages) return null;
                return (
                  <button key={pg} onClick={() => setCurrentPage(pg)}
                    style={{ padding: "8px 14px", borderRadius: 6, background: currentPage === pg ? "#e8ff47" : "#13131a", border: `1px solid ${currentPage === pg ? "#e8ff47" : "#222"}`, color: currentPage === pg ? "#000" : "#f0f0f0", fontWeight: currentPage === pg ? 700 : 400, cursor: "pointer" }}>
                    {pg}
                  </button>
                );
              })}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                style={{ padding: "8px 16px", borderRadius: 6, background: "#13131a", border: "1px solid #222", color: currentPage === totalPages ? "#222" : "#f0f0f0", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
