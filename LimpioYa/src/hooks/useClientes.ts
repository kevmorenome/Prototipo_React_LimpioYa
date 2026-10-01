import { useContext } from "react";
import { ClienteContext } from "../context/ClienteContext";
export function useClientes() {
  const value = useContext(ClienteContext);
  if (!value) throw new Error("useClientes requiere ClienteProvider");
  return value;
}
