import { createContext, type ReactNode } from "react";
import type { Pedido, EstadoPedido } from "../models/pedido.model";
import { pedidosMock } from "../services/mock.service";
import { uid, today } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
interface PedidoValue {
  pedidos: Pedido[];
  crearPedido: (
    value: Pick<Pedido, "clienteId" | "lineas" | "entrega" | "notas">,
  ) => string;
  actualizarEstado: (id: string, estado: EstadoPedido) => void;
}
export const PedidoContext = createContext<PedidoValue | undefined>(undefined);
export function PedidoProvider({ children }: { children: ReactNode }) {
  const [pedidos, set] = useLocalState<Pedido[]>("pedidos", pedidosMock);
  const crearPedido: PedidoValue["crearPedido"] = (value) => {
    if (
      !value.lineas.length ||
      value.lineas.some((l) => l.cantidad <= 0 || !Number.isFinite(l.cantidad))
    )
      throw new Error("Selecciona al menos un servicio y una cantidad válida.");
    if (value.entrega < today())
      throw new Error("Elige una fecha de entrega actual o futura.");
    const id = uid("LY");
    const total = value.lineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
    set((previous) => [
      { ...value, id, total, fecha: today(), estado: "Recibido" },
      ...previous,
    ]);
    return id;
  };
  const actualizarEstado = (id: string, estado: EstadoPedido) =>
    set((previous) =>
      previous.map((p) => (p.id === id ? { ...p, estado } : p)),
    );
  return (
    <PedidoContext.Provider value={{ pedidos, crearPedido, actualizarEstado }}>
      {children}
    </PedidoContext.Provider>
  );
}
