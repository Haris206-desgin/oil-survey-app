// Flattens the questions that are currently visible given the answers so
// far (a toggle question reveals its children only when answered "yes").
export function flattenVisible(questions, answers = {}) {
  let out = [];
  for (const q of questions) {
    out.push(q);
    if (q.children && answers[q.id] === "yes") {
      out = out.concat(flattenVisible(q.children, answers));
    }
  }
  return out;
}

export function isAnswered(q, value) {
  if (value === undefined || value === null || value === "") return false;
  if (q.type === "toggle") return value === "yes" || value === "no";
  return true;
}

export function progressFor(questions, answers = {}) {
  const visible = flattenVisible(questions, answers).filter((q) => q.required);
  const attempted = visible.filter((q) => isAnswered(q, answers[q.id])).length;
  return { attempted, total: visible.length };
}

export function formatDuration(totalSeconds = 0) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function formatDateTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

export function formatTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
