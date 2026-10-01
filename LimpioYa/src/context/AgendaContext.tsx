import { createContext, type ReactNode } from "react";
import type { Cita } from "../models/agenda.model";
import { agendaMock } from "../services/mock.service";
import { today, uid } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
interface AgendaValue {
  citas: Cita[];
  programar: (value: Omit<Cita, "id">) => void;
  cancelar: (id: string) => void;
}
export const AgendaContext = createContext<AgendaValue | undefined>(undefined);
export function AgendaProvider({ children }: { children: ReactNode }) {
  const [citas, set] = useLocalState<Cita[]>("agenda", agendaMock);
  const programar = (value: Omit<Cita, "id">) => {
    if (value.fecha < today())
      throw new Error("Elige una fecha actual o futura.");
    if (
      citas.some(
        (c) =>
          c.clienteId === value.clienteId &&
          c.fecha === value.fecha &&
          c.hora === value.hora,
      )
    )
      throw new Error("Ya tienes una cita en ese horario.");
    set((previous) => [...previous, { ...value, id: uid("AG") }]);
  };
  return (
    <AgendaContext.Provider
      value={{
        citas,
        programar,
        cancelar: (id) =>
          set((previous) => previous.filter((c) => c.id !== id)),
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
}
