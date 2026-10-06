import Link from "next/link";

export default function AdminNavbar() {
  return (
    <header className="flex min-h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 sm:px-8">
      <div>
        <p className="text-sm font-semibold text-white">Dashboard Overview</p>
        <p className="text-xs text-slate-400">Kelola konten portofolio Anda</p>
      </div>
      <Link href="/" className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-indigo-400 hover:text-white">
        Lihat Website Publik
      </Link>
    </header>
  );
}
