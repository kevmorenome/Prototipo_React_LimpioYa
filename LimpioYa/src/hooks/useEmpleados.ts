import { useContext } from "react";
import { EmpleadoContext } from "../context/EmpleadoContext";
export function useEmpleados() {
  const value = useContext(EmpleadoContext);
  if (!value) throw new Error("useEmpleados requiere EmpleadoProvider");
  return value;
}
