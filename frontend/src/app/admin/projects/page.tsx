"use client";

import { FormEvent, useEffect, useState } from "react";
import { Project } from "../../../data/mockData";
import { ProjectPayload, createProject, deleteProject, fetchProjects, updateProject } from "../../../data/api";

const blankForm: ProjectPayload = { title: "", category: "", description: "", tech: [], demo_url: "", github_url: "" };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectPayload>(blankForm);
  const [techText, setTechText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const loadProjects = async () => {
    try { setProjects(await fetchProjects()); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Gagal memuat proyek"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadProjects(); }, []);

  const resetForm = () => { setForm(blankForm); setTechText(""); setEditingId(null); };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { ...form, tech: techText.split(",").map((item) => item.trim()).filter(Boolean) };
    try {
      if (editingId) await updateProject(editingId, payload);
      else await createProject(payload);
      setNotice(editingId ? "Proyek berhasil diperbarui." : "Proyek berhasil ditambahkan.");
      resetForm();
      await loadProjects();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Gagal menyimpan proyek"); }
  };

  const edit = (project: Project) => {
    setEditingId(project.id);
    setForm({ title: project.title, category: project.category || "", description: project.description || "", tech: project.tech, demo_url: project.demoUrl || "", github_url: project.githubUrl || "" });
    setTechText(project.tech.join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: number) => {
    if (!window.confirm("Hapus proyek ini?")) return;
    try { await deleteProject(id); setNotice("Proyek berhasil dihapus."); await loadProjects(); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Gagal menghapus proyek"); }
  };

  const fieldClass = "mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400";
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7"><h1 className="text-2xl font-bold text-white">Manajemen Projects</h1><p className="mt-1 text-sm text-slate-400">Tambah, ubah, atau hapus proyek portofolio.</p></div>
      {notice && <p className="mb-5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200">{notice}</p>}
      <form onSubmit={submit} className="mb-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-semibold text-white">{editingId ? "Edit Proyek" : "Tambah Proyek"}</h2>
        <label className="text-sm text-slate-300">Judul<input required className={fieldClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="text-sm text-slate-300">Kategori<input className={fieldClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web Dev" /></label>
        <label className="md:col-span-2 text-sm text-slate-300">Deskripsi<textarea className={fieldClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <label className="text-sm text-slate-300">Teknologi<input className={fieldClass} value={techText} onChange={(e) => setTechText(e.target.value)} placeholder="Next.js, Express, MySQL" /></label>
        <div className="hidden md:block" />
        <label className="text-sm text-slate-300">URL Demo<input className={fieldClass} value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} /></label>
        <label className="text-sm text-slate-300">URL GitHub<input className={fieldClass} value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} /></label>
        <div className="flex gap-3 md:col-span-2"><button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400" type="submit">{editingId ? "Simpan Perubahan" : "Tambah Proyek"}</button>{editingId && <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300" type="button" onClick={resetForm}>Batal</button>}</div>
      </form>
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950"><table className="min-w-full text-left text-sm"><thead className="border-b border-slate-800 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Project</th><th className="px-5 py-3">Kategori</th><th className="px-5 py-3">Teknologi</th><th className="px-5 py-3 text-right">Aksi</th></tr></thead><tbody className="divide-y divide-slate-800">{loading ? <tr><td className="px-5 py-6 text-slate-500" colSpan={4}>Memuat data...</td></tr> : projects.length === 0 ? <tr><td className="px-5 py-6 text-slate-500" colSpan={4}>Belum ada proyek.</td></tr> : projects.map((project) => <tr key={project.id}><td className="px-5 py-4"><p className="font-medium text-white">{project.title}</p><p className="mt-1 max-w-sm truncate text-xs text-slate-500">{project.description}</p></td><td className="px-5 py-4 text-slate-400">{project.category}</td><td className="px-5 py-4 text-xs text-slate-400">{project.tech.join(", ")}</td><td className="px-5 py-4 text-right"><button onClick={() => edit(project)} className="mr-3 text-indigo-300 hover:text-white">Edit</button><button onClick={() => remove(project.id)} className="text-red-300 hover:text-white">Hapus</button></td></tr>)}</tbody></table></div>
    </div>
  );
}
