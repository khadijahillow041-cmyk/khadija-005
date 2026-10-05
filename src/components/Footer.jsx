import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-extrabold text-white mb-3">
            <span className="text-primary">Medi</span>Care{" "}
            <span className="text-secondary">Pro</span>
          </h3>
          <p className="text-sm leading-relaxed">
            Smart healthcare management connecting patients, doctors and
            administrators on a single secure platform.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-primary">Doctors</Link></li>
            <li><Link to="/departments" className="hover:text-primary">Departments</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/login" className="hover:text-primary">Login</Link></li>
            <li><Link to="/register" className="hover:text-primary">Register</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Emergency</h4>
          <p className="text-sm">24/7 Hotline</p>
          <p className="text-2xl font-bold text-primary mt-1">+254 700 911 911</p>
          <p className="text-sm mt-3">Nairobi, Kenya</p>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} MediCare Pro. All rights reserved.
      </div>
    </footer>
  );
}