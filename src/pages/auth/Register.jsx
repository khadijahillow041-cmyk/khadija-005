import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/patient");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <form onSubmit={submit} className="card">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-1">Create Account</h1>
            <p className="text-sm text-slate-500">Join MediCare Pro today</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="label">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="label">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="label">Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input"
              placeholder="+254 700 000 000"
            />
          </div>

          <div className="mb-6">
            <label className="label">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
