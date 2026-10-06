const express = require("express");
const db = require("../config/db");
const router = express.Router();

const config = {
  skills: { table: "skills", fields: ["skill_group_id", "name", "level", "percentage"] },
  certificates: { table: "certificates", fields: ["title", "issuer", "date", "credential_id", "verification_url"] },
  testimonials: { table: "testimonials", fields: ["name", "role", "company", "avatar", "stars", "quote"] },
  messages: { table: "contacts", fields: ["name", "email", "subject", "message", "is_read"], readOnly: true },
};

router.get("/api/admin/:resource", (req, res) => {
  const item = config[req.params.resource];
  if (!item) return res.status(404).json({ success: false, message: "Resource tidak ditemukan" });
  db.query(`SELECT * FROM ${item.table} ORDER BY created_at DESC`, (err, data) => err ? res.status(500).json({ success: false, message: err.message }) : res.json({ success: true, data }));
});

router.post("/api/admin/:resource", (req, res) => {
  const item = config[req.params.resource];
  if (!item || item.readOnly) return res.status(405).json({ success: false, message: "Resource tidak dapat ditambahkan" });
  const values = item.fields.map((field) => req.body[field] ?? null);
  db.query(`INSERT INTO ${item.table} (${item.fields.join(",")}) VALUES (${item.fields.map(() => "?").join(",")})`, values, (err, result) => err ? res.status(500).json({ success: false, message: err.message }) : res.status(201).json({ success: true, data: { id: result.insertId } }));
});

router.put("/api/admin/:resource/:id", (req, res) => {
  const item = config[req.params.resource];
  if (!item) return res.status(404).json({ success: false, message: "Resource tidak ditemukan" });
  const fields = item.readOnly ? ["is_read"] : item.fields;
  const values = fields.map((field) => req.body[field] ?? null);
  db.query(`UPDATE ${item.table} SET ${fields.map((field) => `${field} = ?`).join(", ")} WHERE id = ?`, [...values, req.params.id], (err, result) => err ? res.status(500).json({ success: false, message: err.message }) : result.affectedRows ? res.json({ success: true }) : res.status(404).json({ success: false, message: "Data tidak ditemukan" }));
});

router.delete("/api/admin/:resource/:id", (req, res) => {
  const item = config[req.params.resource];
  if (!item) return res.status(404).json({ success: false, message: "Resource tidak ditemukan" });
  db.query(`DELETE FROM ${item.table} WHERE id = ?`, [req.params.id], (err, result) => err ? res.status(500).json({ success: false, message: err.message }) : result.affectedRows ? res.json({ success: true }) : res.status(404).json({ success: false, message: "Data tidak ditemukan" }));
});

module.exports = router;
