"use client";

import { useEffect, useState } from "react";
import { ContactMessage, DashboardStats, fetchDashboardStats, fetchMessages } from "../../data/api";

const emptyStats: DashboardStats = {
  totalProjects: 0,
  totalSkills: 0,
  totalCertificates: 0,
  totalTestimonials: 0,
  totalMessages: 0,
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, messagesData] = await Promise.all([fetchDashboardStats(), fetchMessages()]);
        setStats(statsData);
        setMessages(messagesData.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const cards = [
    { label: "Total Projects", value: stats.totalProjects, icon: "◈", color: "from-blue-500 to-indigo-500" },
    { label: "Total Skills", value: stats.totalSkills, icon: "◆", color: "from-violet-500 to-purple-500" },
    { label: "Certificates", value: stats.totalCertificates, icon: "◇", color: "from-amber-500 to-orange-500" },
    { label: "Testimonials", value: stats.totalTestimonials, icon: "★", color: "from-emerald-500 to-teal-500" },
    { label: "Pesan Masuk", value: stats.totalMessages, icon: "✉", color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Selamat datang!</h1>
        <p className="mt-2 text-sm text-slate-400">Ringkasan konten dan aktivitas portofolio Anda.</p>
      </div>

      {error && <p className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-800 bg-slate-950 p-5">
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${card.color} text-lg text-white`}>{card.icon}</div>
            <p className="text-2xl font-bold text-white">{loading ? "…" : card.value}</p>
            <p className="mt-1 text-xs text-slate-400">{card.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div><h2 className="font-semibold text-white">Pesan Kontak Terbaru</h2><p className="mt-1 text-xs text-slate-500">Pesan yang dikirim dari halaman kontak.</p></div>
          <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">{stats.totalMessages} pesan</span>
        </div>
        <div className="divide-y divide-slate-800">
          {loading ? <p className="px-5 py-8 text-sm text-slate-500">Memuat pesan...</p> : messages.length === 0 ? <p className="px-5 py-8 text-sm text-slate-500">Belum ada pesan masuk.</p> : messages.map((message) => (
            <article key={message.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium text-white">{message.name}</p><time className="text-xs text-slate-500">{new Date(message.created_at).toLocaleDateString("id-ID")}</time></div>
              <p className="mt-1 text-xs text-indigo-300">{message.email}{message.subject ? ` · ${message.subject}` : ""}</p>
              <p className="mt-2 text-sm text-slate-400">{message.message}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
