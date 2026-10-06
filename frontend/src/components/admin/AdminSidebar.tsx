"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/skills", label: "Skills", icon: "◆" },
  { href: "/admin/certificates", label: "Certificates", icon: "◇" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "★" },
  { href: "/admin/messages", label: "Messages", icon: "✉" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="px-6 py-5">
        <Link href="/admin" className="text-lg font-bold text-white">Portfolio CMS</Link>
        <p className="mt-1 text-xs text-slate-500">Administration Panel</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col md:overflow-visible">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-indigo-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
              <span aria-hidden="true">{link.icon}</span>{link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
