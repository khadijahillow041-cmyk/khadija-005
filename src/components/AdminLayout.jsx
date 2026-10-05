import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="hidden md:flex md:shrink-0 h-full overflow-y-auto">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminNavbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}