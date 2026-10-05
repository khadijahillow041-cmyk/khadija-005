import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div className="card text-center hover:shadow-lg transition">
      <img
        src={doctor.avatar}
        alt={doctor.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary/20 object-cover object-top"
      />
      <h3 className="font-bold text-lg">{doctor.name}</h3>
      <p className="text-primary text-sm font-semibold">{doctor.specialty}</p>
      <p className="text-xs text-slate-500 mt-1">
        {doctor.experience} yrs experience
      </p>
      <p className="text-sm mt-2 font-semibold">Fee: KES {doctor.fee}</p>
      <Link
        to={"/doctors/" + doctor.id}
        className="inline-block mt-4 btn-primary text-sm"
      >
        View Profile
      </Link>
    </div>
  );
}