import { createContext, type ReactNode } from "react";
import type { Pago } from "../models/pago.model";
import { pagosMock } from "../services/mock.service";
import { today, uid } from "../services/storage.service";
import { useLocalState } from "../hooks/useLocalState";
import { usePedidos } from "../hooks/usePedidos";
interface PagoValue {
  pagos: Pago[];
  pagar: (pedidoId: string, metodo: string) => void;
}
export const PagoContext = createContext<PagoValue | undefined>(undefined);
export function PagoProvider({ children }: { children: ReactNode }) {
  const [pagos, set] = useLocalState<Pago[]>("pagos", pagosMock);
  const { pedidos } = usePedidos();
  const pagar = (pedidoId: string, metodo: string) => {
    const pedido = pedidos.find((p) => p.id === pedidoId);
    if (!pedido) throw new Error("Pedido no encontrado.");
    set((previous) =>
      previous.some((p) => p.pedidoId === pedidoId)
        ? previous
        : [
            ...previous,
            {
              id: uid("FAC"),
              pedidoId,
              monto: pedido.total,
              fecha: today(),
              metodo,
            },
          ],
    );
  };
  return (
    <PagoContext.Provider value={{ pagos, pagar }}>
      {children}
    </PagoContext.Provider>
  );
}
