export const formatRuntime = (minutes) => {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}min` : `${m}min`;
};

export const yearOf = (date) => (date ? String(date).slice(0, 4) : "");

export const GENDERS = { 1: "Female", 2: "Male", 3: "Non-binary" };
