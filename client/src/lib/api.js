// const TOKEN_KEY = "oil_survey_token";

// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function setToken(token) {
//   if (token) localStorage.setItem(TOKEN_KEY, token);
//   else localStorage.removeItem(TOKEN_KEY);
// }

// async function request(path, { method = "GET", body, auth = true } = {}) {
//   const headers = { "Content-Type": "application/json" };
//   if (auth) {
//     const token = getToken();
//     if (token) headers.Authorization = `Bearer ${token}`;
//   }
//   const res = await fetch(`/api${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });
//   const isJson = res.headers.get("content-type")?.includes("application/json");
//   const data = isJson ? await res.json() : null;
//   if (!res.ok) {
//     throw new Error(data?.error || `Request failed (${res.status})`);
//   }
//   return data;
// }

// export const api = {
//   login: (username, password) =>
//     request("/auth/login", { method: "POST", body: { username, password }, auth: false }),
//   me: () => request("/me"),
//   surveyTypes: () => request("/survey-types"),
//   surveyType: (slug) => request(`/survey-types/${slug}`),
//   siteVisits: (siteId) => request(`/sites/${siteId}/visits`),
//   visit: (id) => request(`/visits/${id}`),
//   createVisit: (payload) => request("/visits", { method: "POST", body: payload }),
//   upload: (dataUrl) => request("/upload", { method: "POST", body: { dataUrl } }),
// };
























// const TOKEN_KEY = "oil_survey_token";

// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// export function setToken(token) {
//   if (token) localStorage.setItem(TOKEN_KEY, token);
//   else localStorage.removeItem(TOKEN_KEY);
// }

// async function request(path, { method = "GET", body, auth = true } = {}) {
//   const headers = { "Content-Type": "application/json" };
//   if (auth) {
//     const token = getToken();
//     if (token) headers.Authorization = `Bearer ${token}`;
//   }

//   const res = await fetch(`/api${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const isJson = res.headers.get("content-type")?.includes("application/json");
//   const data = isJson ? await res.json() : null;

//   if (!res.ok) {
//     // Exact backend error message throw hoga
//     throw new Error(data?.error || `Request failed (${res.status})`);
//   }

//   return data;
// }

// export const api = {
//   login: (username, password) =>
//     request("/auth/login", { method: "POST", body: { username, password }, auth: false }),
//   me: () => request("/me"),
//   surveyTypes: () => request("/survey-types"),
//   surveyType: (slug) => request(`/survey-types/${slug}`),
//   siteVisits: (siteId) => request(`/sites/${siteId}/visits`),
//   visit: (id) => request(`/visits/${id}`),
//   createVisit: (payload) => request("/visits", { method: "POST", body: payload }),
//   upload: (dataUrl) => request("/upload", { method: "POST", body: { dataUrl } }),
// };






const TOKEN_KEY = "oil_survey_token";

// Dynamic API URL: Agar Vercel par env variable set hai toh woh use hoga, otherwise local `/api` relative URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  // API_BASE_URL append kiya gaya hai taake Vercel live backend URL par hit kare
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }

  return data;
}

export const api = {
  login: (username, password) =>
    request("/auth/login", { method: "POST", body: { username, password }, auth: false }),
  me: () => request("/me"),
  surveyTypes: () => request("/survey-types"),
  surveyType: (slug) => request(`/survey-types/${slug}`),
  siteVisits: (siteId) => request(`/sites/${siteId}/visits`),
  visit: (id) => request(`/visits/${id}`),
  createVisit: (payload) => request("/visits", { method: "POST", body: payload }),
  upload: (dataUrl) => request("/upload", { method: "POST", body: { dataUrl } }),
};