import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "server", "src", "data");
const INVOICE_FILE = path.join(DATA_DIR, "invoices.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(INVOICE_FILE)) fs.writeFileSync(INVOICE_FILE, "[]");
}

export function readInvoices() {
  ensureDir();
  const raw = fs.readFileSync(INVOICE_FILE, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function writeInvoices(items) {
  ensureDir();
  fs.writeFileSync(INVOICE_FILE, JSON.stringify(items, null, 2));
}

export function addInvoice(inv) {
  const items = readInvoices();
  items.push(inv);
  writeInvoices(items);
}

export function updateInvoice(reference, patch) {
  const items = readInvoices();
  const idx = items.findIndex((i) => i.reference === reference);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  writeInvoices(items);
  return items[idx];
}
