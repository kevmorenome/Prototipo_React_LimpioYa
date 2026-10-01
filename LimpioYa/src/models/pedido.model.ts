export const estados = [
  "Recibido",
  "En lavado",
  "En secado",
  "Listo",
  "Entregado",
] as const;
export type EstadoPedido = (typeof estados)[number];
export interface LineaPedido {
  servicioId: string;
  nombre: string;
  cantidad: number;
  precio: number;
}
export interface Pedido {
  id: string;
  clienteId: string;
  fecha: string;
  entrega: string;
  estado: EstadoPedido;
  lineas: LineaPedido[];
  total: number;
  notas: string;
}
