import { usePedidos } from "./usePedidos";
import { usePagos } from "./usePagos";
import { useClientes } from "./useClientes";
import { estados } from "../models/pedido.model";
export function useMetricas() {
  const { pedidos } = usePedidos();
  const { pagos } = usePagos();
  const { clientes } = useClientes();
  const ingresos = pagos.reduce((s, p) => s + p.monto, 0);
  const ventas = pedidos.reduce((s, p) => s + p.total, 0);
  const porEstado = estados.map((estado) => ({
    estado,
    cantidad: pedidos.filter((p) => p.estado === estado).length,
  }));
  const porServicio = Object.values(
    pedidos
      .flatMap((p) => p.lineas)
      .reduce<Record<string, { nombre: string; total: number }>>((acc, l) => {
        acc[l.servicioId] ??= { nombre: l.nombre, total: 0 };
        acc[l.servicioId].total += l.cantidad * l.precio;
        return acc;
      }, {}),
  );
  const porFecha = Object.values(
    pagos.reduce<Record<string, { fecha: string; total: number }>>((acc, p) => {
      acc[p.fecha] ??= { fecha: p.fecha, total: 0 };
      acc[p.fecha].total += p.monto;
      return acc;
    }, {}),
  ).sort((a, b) => a.fecha.localeCompare(b.fecha));
  return {
    pedidos,
    ingresos,
    ventas,
    pendiente: ventas - ingresos,
    clientesActivos: clientes.filter((c) => c.activo).length,
    activos: pedidos.filter((p) => p.estado !== "Entregado").length,
    entregados: pedidos.filter((p) => p.estado === "Entregado").length,
    ticket: pedidos.length ? ventas / pedidos.length : 0,
    porEstado,
    porServicio,
    porFecha,
  };
}
