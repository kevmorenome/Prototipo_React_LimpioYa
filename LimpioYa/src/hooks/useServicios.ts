import { useContext } from "react";
import { ServicioContext } from "../context/ServicioContext";
export function useServicios() {
  const value = useContext(ServicioContext);
  if (!value) throw new Error("useServicios requiere ServicioProvider");
  return value;
}
