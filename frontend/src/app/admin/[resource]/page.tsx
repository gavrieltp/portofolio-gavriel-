"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { deleteAdminResource, fetchAdminResource, saveAdminResource } from "../../../data/api";

const definitions: Record<string, { title: string; fields: { key: string; label: string; type?: string }[]; readOnly?: boolean }> = {
  skills: { title: "Manajemen Skills", fields: [{ key: "skill_group_id", label: "ID Grup", type: "number" }, { key: "name", label: "Nama Skill" }, { key: "level", label: "Level" }, { key: "percentage", label: "Persentase", type: "number" }] },
  certificates: { title: "Manajemen Certificates", fields: [{ key: "title", label: "Judul" }, { key: "issuer", label: "Penerbit" }, { key: "date", label: "Tanggal" }, { key: "credential_id", label: "ID Kredensial" }, { key: "verification_url", label: "URL Verifikasi" }] },
  testimonials: { title: "Manajemen Testimonials", fields: [{ key: "name", label: "Nama" }, { key: "role", label: "Peran" }, { key: "company", label: "Instansi" }, { key: "avatar", label: "Avatar / Emoji" }, { key: "stars", label: "Rating", type: "number" }, { key: "quote", label: "Testimoni", type: "textarea" }] },
  messages: { title: "Pesan Kontak", fields: [], readOnly: true },
};

export default function AdminResourcePage() {
  const params = useParams<{ resource: string }>();
  const resource = params.resource;
  const definition = definitions[resource];
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [editing, setEditing] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const blank = useMemo(() => Object.fromEntries(definition?.fields.map((field) => [field.key, ""]) || []), [definition]);
  const load = async () => { if (!definition) return; try { setRows(await fetchAdminResource(resource)); } catch (err) { setNotice(err instanceof Error ? err.message : "Gagal memuat data"); } finally { setLoading(false); } };
  useEffect(() => { setForm(blank); load(); }, [resource, blank]);
  if (!definition) return <p className="text-slate-400">Halaman tidak ditemukan.</p>;
  const reset = () => { setForm(blank); setEditing(null); };
  const submit = async (event: FormEvent) => { event.preventDefault(); try { await saveAdminResource(resource, editing ? "PUT" : "POST", form, editing || undefined); setNotice("Data berhasil disimpan."); reset(); await load(); } catch (err) { setNotice(err instanceof Error ? err.message : "Gagal menyimpan data"); } };
  const remove = async (id: number) => { if (!window.confirm("Hapus data ini?")) return; try { await deleteAdminResource(resource, id); setNotice("Data berhasil dihapus."); await load(); } catch (err) { setNotice(err instanceof Error ? err.message : "Gagal menghapus data"); } };
  const fieldClass = "mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400";
  return <div className="mx-auto max-w-6xl"><div className="mb-7"><h1 className="text-2xl font-bold text-white">{definition.title}</h1><p className="mt-1 text-sm text-slate-400">Kelola data melalui dashboard admin.</p></div>{notice && <p className="mb-5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200">{notice}</p>}{!definition.readOnly && <form onSubmit={submit} className="mb-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5 md:grid-cols-2"><h2 className="md:col-span-2 font-semibold text-white">{editing ? "Edit Data" : "Tambah Data"}</h2>{definition.fields.map((field) => <label key={field.key} className={`text-sm text-slate-300 ${field.type === "textarea" ? "md:col-span-2" : ""}`}>{field.label}{field.type === "textarea" ? <textarea required className={fieldClass} rows={3} value={String(form[field.key] || "")} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} /> : <input required={field.key === "name" || field.key === "title"} type={field.type || "text"} className={fieldClass} value={String(form[field.key] || "")} onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })} />}</label>)}<div className="flex gap-3 md:col-span-2"><button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white" type="submit">Simpan</button>{editing && <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300" type="button" onClick={reset}>Batal</button>}</div></form>}<div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950"><table className="min-w-full text-left text-sm"><thead className="border-b border-slate-800 text-xs uppercase text-slate-500"><tr>{(definition.readOnly ? ["name", "email", "subject", "message", "is_read"] : definition.fields.map((field) => field.key)).map((key) => <th key={key} className="px-4 py-3">{key.replaceAll("_", " ")}</th>)}<th className="px-4 py-3 text-right">Aksi</th></tr></thead><tbody className="divide-y divide-slate-800">{loading ? <tr><td className="px-4 py-6 text-slate-500" colSpan={8}>Memuat data...</td></tr> : rows.length === 0 ? <tr><td className="px-4 py-6 text-slate-500" colSpan={8}>Belum ada data.</td></tr> : rows.map((row) => <tr key={Number(row.id)}>{(definition.readOnly ? ["name", "email", "subject", "message", "is_read"] : definition.fields.map((field) => field.key)).map((key) => <td key={key} className="max-w-48 truncate px-4 py-3 text-slate-300">{String(row[key] ?? "-")}</td>)}<td className="whitespace-nowrap px-4 py-3 text-right">{definition.readOnly && !Number(row.is_read) && <button onClick={async () => { await saveAdminResource(resource, "PUT", { is_read: 1 }, Number(row.id)); await load(); }} className="mr-3 text-indigo-300">Baca</button>}{!definition.readOnly && <button onClick={() => { setEditing(Number(row.id)); setForm(Object.fromEntries(definition.fields.map((field) => [field.key, row[field.key] ?? ""]))); }} className="mr-3 text-indigo-300">Edit</button>}<button onClick={() => remove(Number(row.id))} className="text-red-300">Hapus</button></td></tr>)}</tbody></table></div></div>;
}
