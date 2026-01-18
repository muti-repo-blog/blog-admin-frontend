export default function toUserTime(iso) {
  const d = new Date(iso); // ISO with Z from backend
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
