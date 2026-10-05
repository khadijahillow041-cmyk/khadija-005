import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/Loader";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    api.get("/blogs").then((r) => {
      const sorted = r.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setBlogs(sorted);
      setFiltered(sorted);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      blogs.filter((b) => {
        const matchesSearch =
          b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
          b.author?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || b.category === category;
        return matchesSearch && matchesCategory;
      })
    );
  }, [search, category, blogs]);

  const categories = [
    "All",
    ...new Set(blogs.map((b) => b.category).filter(Boolean)),
  ];

  const featured = blogs[0];

  if (loading) return <Loader />;

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-dark via-slate-900 to-primary/40 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <span className="badge bg-primary/20 text-primary mb-4">
            {blogs.length} Health Articles
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Health Blog
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Expert medical insights from our board-certified specialists.
            Learn how to live healthier every day.
          </p>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10 mb-12">
          <div className="card shadow-lg overflow-hidden p-0">
            <div className="grid md:grid-cols-2">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge bg-primary/10 text-primary">
                    ⭐ Featured
                  </span>
                  <span className="badge bg-secondary/10 text-secondary">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 dark:text-white">
                  {featured.title}
                </h2>
                <p className="text-slate-500 mb-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>✍️ {featured.author}</span>
                  <span>📅 {featured.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FILTERS ===== */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="card">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">🔍 Search Articles</label>
              <input
                placeholder="Search by title, author, or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">📚 Filter by Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            Showing <b className="text-slate-800 dark:text-white">{filtered.length}</b> of{" "}
            <b className="text-slate-800 dark:text-white">{blogs.length}</b> articles
          </p>
        </div>
      </section>

      {/* ===== BLOG GRID ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
              No articles found
            </h3>
            <p className="text-slate-500">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => (
              <article
                key={b.id}
                className="group card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden p-0 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 badge bg-primary text-white shadow">
                    {b.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white group-hover:text-primary transition line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {b.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <span className="flex items-center gap-1">
                      ✍️ {b.author}
                    </span>
                    <span className="flex items-center gap-1">
                      📅 {b.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Want personalized health advice?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Book an appointment with one of our specialists to get tailored
            recommendations for your health.
          </p>
          <Link
            to="/doctors"
            className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-slate-100 transition inline-block"
          >
            👨‍⚕️ Find a Doctor
          </Link>
        </div>
      </section>
    </div>
  );
}