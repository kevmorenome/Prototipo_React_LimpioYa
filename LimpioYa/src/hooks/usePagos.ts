import { useContext } from "react";
import { PagoContext } from "../context/PagoContext";
export function usePagos() {
  const value = useContext(PagoContext);
  if (!value) throw new Error("usePagos requiere PagoProvider");
  return value;
}
