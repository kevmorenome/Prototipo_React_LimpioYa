import { createContext, type ReactNode } from "react";
import type { Servicio } from "../models/servicio.model";
import { serviciosMock } from "../services/mock.service";
import { uid } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
interface ContextValue {
  servicios: Servicio[];
  guardar: (value: Omit<Servicio, "id">, id?: string) => string;
  alternarActivo: (id: string) => void;
}
export const ServicioContext = createContext<ContextValue | undefined>(
  undefined,
);
export function ServicioProvider({ children }: { children: ReactNode }) {
  const [servicios, set] = useLocalState<Servicio[]>(
    "servicios",
    serviciosMock,
  );
  const guardar = (value: Omit<Servicio, "id">, id?: string) => {
    const nextId = id || uid("s");
    if (value.precio <= 0)
      throw new Error("El precio debe ser mayor que cero.");
    set((previous) =>
      id
        ? previous.map((x) => (x.id === id ? { ...value, id } : x))
        : [...previous, { ...value, id: nextId }],
    );
    return nextId;
  };
  const alternarActivo = (id: string) =>
    set((previous) =>
      previous.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x)),
    );
  return (
    <ServicioContext.Provider value={{ servicios, guardar, alternarActivo }}>
      {children}
    </ServicioContext.Provider>
  );
}
