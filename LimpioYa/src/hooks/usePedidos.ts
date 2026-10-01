import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";
export function usePedidos() {
  const value = useContext(PedidoContext);
  if (!value) throw new Error("usePedidos requiere PedidoProvider");
  return value;
}
