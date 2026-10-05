import PatientSidebar from "./PatientSidebar";
import PatientNavbar from "./PatientNavbar";

export default function PatientLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="hidden md:flex md:shrink-0 h-full">
        <PatientSidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <PatientNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}