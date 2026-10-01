import { createContext, type ReactNode } from "react";
import type { Empleado } from "../models/empleado.model";
import { empleadosMock } from "../services/mock.service";
import { uid } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
interface ContextValue {
  empleados: Empleado[];
  guardar: (value: Omit<Empleado, "id">, id?: string) => string;
  alternarActivo: (id: string) => void;
}
export const EmpleadoContext = createContext<ContextValue | undefined>(
  undefined,
);
export function EmpleadoProvider({ children }: { children: ReactNode }) {
  const [empleados, set] = useLocalState<Empleado[]>(
    "empleados",
    empleadosMock,
  );
  const guardar = (value: Omit<Empleado, "id">, id?: string) => {
    const nextId = id || uid("e");
    if (
      empleados.some(
        (x) =>
          x.email.toLowerCase() === value.email.toLowerCase() && x.id !== id,
      )
    )
      throw new Error("Este correo ya está registrado.");
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
    <EmpleadoContext.Provider value={{ empleados, guardar, alternarActivo }}>
      {children}
    </EmpleadoContext.Provider>
  );
}
