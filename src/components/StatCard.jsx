export default function StatCard({ label, value, icon, color = "bg-primary/10" }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={"text-3xl w-14 h-14 rounded-xl flex items-center justify-center " + color}>{icon}</div>
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
