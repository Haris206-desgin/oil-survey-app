import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data.json");

// ---- Question schema shared by the field-survey types -------------------
const standardQuestions = [
  { id: "checkin", type: "toggle", label: "Have you done checkin", required: true },
  { id: "fascia_picture", type: "photo", label: "Take Fascia Picture", required: true },
  { id: "setup_deployed", type: "toggle", label: "Is the setup deployed", required: true },
  { id: "setup_picture", type: "photo", label: "Take Picture", required: true },
  { id: "posm_deployed", type: "toggle", label: "Is the POSM deployed", required: true },
  { id: "posm_picture", type: "photo", label: "Take Picture", required: true },
  {
    id: "merchandising",
    type: "toggle",
    label: "Is the site Merchandising / Decor as per plan",
    required: true,
  },
  { id: "merchandising_picture", type: "photo", label: "Take Picture", required: true },
  {
    id: "consumer_info",
    type: "toggle",
    label: "Consumer Info",
    required: true,
    children: [
      { id: "consumer_name", type: "text", label: "Consumer Name", required: true },
      { id: "contact_1", type: "text", label: "Contact Numer 01", required: true, inputMode: "tel" },
      { id: "contact_2", type: "text", label: "Contact Numer 02", required: false, inputMode: "tel" },
      { id: "cnic", type: "text", label: "CNIC Number", required: true, inputMode: "numeric" },
      { id: "address", type: "text", label: "Address", required: true },
      { id: "invoice_picture", type: "photo", label: "Invoice Picture", required: true },
      { id: "activation_code", type: "text", label: "Oil - Activation code", required: true },
      { id: "code_picture", type: "photo", label: "Code Picture", required: true },
      { id: "giveaways", type: "number", label: "No. of giveaways", required: true },
    ],
  },
];

function seedData() {
  const now = Date.now();
  return {
    users: [
      { id: "u1", username: "testuser", password: "password123", name: "Test User" },
    ],
    categories: [{ id: "cat-deo", name: "DEO" }],
    surveyTypes: [
      {
        id: "st-bus-adda",
        categoryId: "cat-deo",
        slug: "deo-bus-adda",
        name: "DEO Bus Adda",
        questions: standardQuestions,
      },
      {
        id: "st-forecourt",
        categoryId: "cat-deo",
        slug: "cariant-forecourt",
        name: "Cariant Forecourt",
        questions: standardQuestions,
      },
      {
        id: "st-oil-filter",
        categoryId: "cat-deo",
        slug: "cariant-oil-filter",
        name: "Cariant Oil Filter",
        questions: standardQuestions,
      },
    ],
    sites: [
      { id: "site-1", surveyTypeId: "st-bus-adda", name: "Bus Adda - Multan Road", address: "Multan Road, Lahore" },
      { id: "site-2", surveyTypeId: "st-bus-adda", name: "Bus Adda - Ferozepur Road", address: "Ferozepur Road, Lahore" },
      { id: "site-3", surveyTypeId: "st-forecourt", name: "Cariant Forecourt - DHA Phase 5", address: "DHA Phase 5, Lahore" },
      { id: "site-4", surveyTypeId: "st-forecourt", name: "Cariant Forecourt - Gulberg", address: "Main Boulevard Gulberg, Lahore" },
      { id: "site-5", surveyTypeId: "st-oil-filter", name: "Cariant Oil Filter - Model Town", address: "Model Town Link Road, Lahore" },
      { id: "site-6", surveyTypeId: "st-oil-filter", name: "Cariant Oil Filter - Johar Town", address: "Johar Town, Lahore" },
    ],
    visits: [],
    _createdAt: now,
  };
}

function readDB() {
  if (!fs.existsSync(DATA_FILE)) {
    const fresh = seedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fresh, null, 2));
    return fresh;
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    const fresh = seedData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fresh, null, 2));
    return fresh;
  }
}

function writeDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

export function resetDB() {
  const fresh = seedData();
  writeDB(fresh);
  return fresh;
}

export { readDB, writeDB };
