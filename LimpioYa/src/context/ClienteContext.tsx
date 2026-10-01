import { createContext, type ReactNode } from "react";
import type { Cliente } from "../models/cliente.model";
import { clientesMock } from "../services/mock.service";
import { uid } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
interface ContextValue {
  clientes: Cliente[];
  guardar: (value: Omit<Cliente, "id">, id?: string) => string;
  alternarActivo: (id: string) => void;
}
export const ClienteContext = createContext<ContextValue | undefined>(
  undefined,
);
export function ClienteProvider({ children }: { children: ReactNode }) {
  const [clientes, set] = useLocalState<Cliente[]>("clientes", clientesMock);
  const guardar = (value: Omit<Cliente, "id">, id?: string) => {
    const nextId = id || uid("c");
    if (
      clientes.some(
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
    <ClienteContext.Provider value={{ clientes, guardar, alternarActivo }}>
      {children}
    </ClienteContext.Provider>
  );
}
