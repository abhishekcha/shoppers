import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getHomeData = async () => {
    try {
      setLoading(true);
      setError("");

      const [productsRes, categoriesRes] = await Promise.all([
        fetch("https://dummyjson.com/products?limit=8"),
        fetch("https://dummyjson.com/products/categories"),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Unable to load homepage data");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData.products || []);
      setCategories(categoriesData || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-6 bg-amber-50 min-h-[80vh]">
        <section className="rounded-2xl p-8 bg-linear-to-r from-orange-300 via-amber-200 to-lime-200 shadow-md mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Find Your Next Favorite Product
          </h1>
          <p className="text-slate-700 mb-5 max-w-3xl">
            Explore trending items, browse smart categories, and jump straight to the products you need.
          </p>
          <Link
            to="/search?text=phone"
            className="inline-block py-2 px-5 rounded-lg bg-slate-800 text-white"
          >
            Start Shopping
          </Link>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">Popular Categories</h2>
            <Link to="/category" className="text-sm text-slate-700 underline">
              View all
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.slice(0, 10).map((category) => {
              const categoryName = typeof category === "string" ? category : category.name;
              return (
                <Link
                  key={categoryName}
                  to={`/search?text=${encodeURIComponent(categoryName)}`}
                  className="py-2 px-4 rounded-full bg-emerald-200 text-slate-800 hover:bg-emerald-300"
                >
                  {categoryName}
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Latest Products</h2>

          {loading && (
            <div className="grid gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl bg-cyan-100 animate-pulse"
                ></div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-4 rounded-lg bg-red-100 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export { HomePage };
