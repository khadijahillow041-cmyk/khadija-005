import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";

export default function DoctorLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="hidden md:flex md:shrink-0 h-full overflow-y-auto">
        <DoctorSidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DoctorNavbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}