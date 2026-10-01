export const storage = {
  read<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem("limpioya:v1:" + key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  write<T>(key: string, value: T) {
    try {
      localStorage.setItem("limpioya:v1:" + key, JSON.stringify(value));
    } catch {
      /* La sesión sigue funcionando si el almacenamiento no está disponible. */
    }
  },
};
export const uid = (prefix: string) =>
  prefix + "-" + crypto.randomUUID().slice(0, 8);
export const money = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
export const dateLabel = (date: string) =>
  new Date(date + "T12:00:00").toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export const today = () => {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};
