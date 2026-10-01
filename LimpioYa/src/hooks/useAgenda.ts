import { useContext } from "react";
import { AgendaContext } from "../context/AgendaContext";
export function useAgenda() {
  const value = useContext(AgendaContext);
  if (!value) throw new Error("useAgenda requiere AgendaProvider");
  return value;
}
