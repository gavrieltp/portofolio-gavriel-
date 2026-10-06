import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mt-16 flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminNavbar />
        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
