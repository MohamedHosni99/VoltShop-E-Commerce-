import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/api";

export function useProducts() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prods, cats] = await Promise.all([getProducts(40), getCategories()]);
        // تنظيف المنتجات من الصور الفاسدة
        const clean = prods.filter(
          p => p.images?.length && p.title && p.price > 0 && !p.images[0].includes("[")
        );
        setProducts(clean);
        setCategories(cats.slice(0, 6));
      } catch (e) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { products, categories, loading, error };
}
