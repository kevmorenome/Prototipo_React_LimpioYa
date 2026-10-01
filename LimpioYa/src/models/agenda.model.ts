export interface Cita {
  id: string;
  clienteId: string;
  pedidoId: string;
  fecha: string;
  hora: string;
  tipo: "Recogida" | "Entrega";
  direccion: string;
}
